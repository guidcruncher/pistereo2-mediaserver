#!/bin/sh

export PISTEREO_CLIENTSECRET=""
if [ -f "/run/secrets/PISTEREO_CLIENTSECRET" ]; then
  export PISTEREO_CLIENTSECRET="$(cat /run/secrets/PISTEREO_CLIENTSECRET)"
fi

export PISTEREO_MEDIASERVER_SECRET=""
if [ -f "/run/secrets/PISTEREO_MEDIASERVER_SECRET" ]; then
  export PISTEREO_MEDIASERVER_SECRET="$(cat /run/secrets/PISTEREO_MEDIASERVER_SECRET)"
fi

configfilename="$PISTEREO_CONFIG"/configuration.env
if [ -f "$configfilename" ]; then
  dotenv -o -e "$configfilename" -- node ./main.js
else
  node ./main.js
fi

