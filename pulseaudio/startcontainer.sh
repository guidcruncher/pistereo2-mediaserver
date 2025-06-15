#!/bin/sh
export PISTEREO_CLIENTSECRET=""
configfilename="$PISTEREO_CONFIG"/configuration.env

ln -sf /usr/share/zoneinfo/$TZ /etc/localtime 
echo $TZ > /etc/timezone

if [ -f "/run/secrets/PISTEREO_CLIENTSECRET" ]; then
  export PISTEREO_CLIENTSECRET="$(cat /run/secrets/PISTEREO_CLIENTSECRET)"
fi

if [ -f "$configfilename" ]; then
  dotenv -o -e "$configfilename" -- pm2 start ./ecosystem.config.js --env $NODE_ENV
else
  pm2 start ./ecosystem.config.js --env $NODE_ENV
fi

pm2 logs
