#!/bin/sh

configfilename="$PISTEREO_CONFIG"/configuration.env
if [ -f "$configfilename" ]; then
  dotenv -o -e "$configfilename" -- mpv -v --alsa-mixer-device="$PISTEREO_ALSA_DEVICE" \
  --ao=alsa \
  --no-video --keep-open=yes \
  --input-ipc-server="$PISTEREO_MPV_SOCKET" \
  --idle=yes --display-tags-clr --msg-level=cplayer=error \
  --no-terminal --really-quiet \
  --stream-buffer-size=$PISTEREO_STREAM_BUFFER_SIZE \
  --cache=no
else
  mpv -v --alsa-mixer-device="$PISTEREO_ALSA_DEVICE" \
  --ao=alsa \
  --no-video --keep-open=yes \
  --input-ipc-server="$PISTEREO_MPV_SOCKET" \
  --idle=yes --display-tags-clr --msg-level=cplayer=error \
  --no-terminal --really-quiet \
  --stream-buffer-size=$PISTEREO_STREAM_BUFFER_SIZE \
  --cache=no
fi
