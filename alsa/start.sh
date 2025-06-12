#!/bin/sh

ln -sf /usr/share/zoneinfo/$TZ /etc/localtime 
echo $TZ > /etc/timezone

export PISTEREO_CLIENTSECRET=""

if [ -f "/run/secrets/PISTEREO_CLIENTSECRET" ]; then
  export PISTEREO_CLIENTSECRET="$(cat /run/secrets/PISTEREO_CLIENTSECRET)"
fi

pm2 start ./ecosystem.config.js --env $NODE_ENV

pm2 logs
