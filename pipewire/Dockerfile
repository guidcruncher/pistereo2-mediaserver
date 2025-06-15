FROM --platform=linux/arm64 node:bookworm-slim AS build
WORKDIR /build
ADD ./mediaserver/ /build/

RUN <<EOF
npm i --prefer-offline --no-audit --progress=false
npm run build
mkdir -p /build/dist/node_modules/
cp /build/api.sh /build/dist/api.sh
chmod +x /build/dist/api.sh
cp node_modules/* /build/dist/node_modules/ -r
EOF

FROM --platform=linux/arm64 node:bookworm-slim AS base
ARG DEBIAN_FRONTEND=noninteractive
ENV NODE_ENV=production
ARG TARGETARCH
ENV TZ=UTC

RUN <<EOF
apt update
apt install -y tzdata ca-certificates curl golang jq socat gettext
apt install -y alsa-utils alsa-tools libasound2 jq sudo libogg-dev \
  libvorbis-dev libasound2-dev libasound2-plugin-equal \
  libasound2-plugins mpv

apt install -y pipewire-alsa pipewire pipewire-tools

apt clean -y > /dev/null
rm -rf /var/cache/apt/archives /var/lib/apt/lists

ln -sf /usr/share/zoneinfo/$TZ /etc/localtime
echo $TZ > /etc/timezone
EOF

RUN <<EOF
npm i -g @nestjs/cli pm2 dotenv-cli --no-audit
npm cache clean --force
pm2 install pm2-logrotate
pm2 set pm2-logrotate:retain 2
pm2 set pm2-logrotate:max_size 5M
mkdir -p /config /cache
mkdir -p /app/librespot /app/mpv /app/mediaserver
EOF

WORKDIR /app
COPY ./alsa/config/100-equal.conf /etc/alsa/conf.d/100-equal.conf
COPY ./alsa/config/asound.conf /etc/asound.conf
COPY --from=build /build/dist/ /app/mediaserver
COPY ./mediaserver/api.sh /app/mediaserver/api.sh
COPY ./alsa/startcontainer.sh .
COPY ./ecosystem.config.js .
ADD ./alsa/librespot/ /app/librespot
ADD ./alsa/mpv/ /app/mpv
RUN chmod +x ./mpv/*.sh ./librespot/*.sh ./*.sh ./mediaserver/*.sh

RUN <<EOF
mkdir -p ./librespot
cd ./librespot

if [ -z "$TARGETARCH" ]; then
  TARGETARCH="$(uname -m)"
fi
ARCH="$TARGETARCH"

if [ "$TARGETARCH" = "aarch64" ]; then
  ARCH="arm64"
fi

echo "Looking for go-librespot_linux_$ARCH.tar.gz"

DOWNLOAD_URL=$(curl -s \
  https://api.github.com/repos/devgianlu/go-librespot/releases/latest | \
  jq '.assets[].browser_download_url' -r | \
  grep "go-librespot_linux_$ARCH.tar.gz" \
  )

if [ -z "$DOWNLOAD_URL" ]; then
  echo "Unable to determime download url for arch $ARCH"
  exit 1
else
  echo "Downloading from $DOWNLOAD_URL"
  curl -s -L "$DOWNLOAD_URL" -o ./librespot.tar.gz 2>/dev/null

    if [ -f "./librespot.tar.gz" ]; then
      tar xvf ./librespot.tar.gz go-librespot
      chmod +x go-librespot
      rm ./librespot.tar.gz
    else
      echo "An error occured, download file not found."
      exit 1
    fi
fi

cd ..
EOF

ENV PISTEREO_ALSA_DEVICE=equal
ENV PISTEREO_LIBRESPOT_ALSA_MIXER_DEVICE=
ENV PISTEREO_LIBRESPOT_ALSA_MIXER_CONTROL=Master
ENV PISTEREO_LIBRESPOT_PLAYBACK_BITRATE=160
ENV PISTEREO_CLIENTID=""
ENV PISTEREO_REMOTEDEVICE="Your Stereo"
ENV PISTEREO_LOCALDEVICE="Your Device"
ENV PISTEREO_LISTEN_PORT=3002
ENV PISTEREO_MONGO_URL=""
ENV PISTEREO_MONGO_DB=pistereo2
ENV PISTEREO_MPV_SOCKET=/app/mpv/socket
ENV PISTEREO_STREAM_BUFFER_SIZE=1MiB
ENV PISTEREO_CACHE=/cache
ENV PISTEREO_CONFIG=/config
ENV IN_DOCKER="yes"
ENV PISTEREO_EQ_RESET=60

ENTRYPOINT [ "/bin/sh", "-E", "-c" ]
CMD ["/app/startcontainer.sh"]
