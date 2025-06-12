#!/bin/sh
mkdir -p "$PISTEREO_CONFIG"/.librespot

export PISTEREO_CLIENTSECRET=""

if [ -f "/run/secrets/PISTEREO_CLIENTSECRET" ]; then
  export PISTEREO_CLIENTSECRET="$(cat /run/secrets/PISTEREO_CLIENTSECRET)"
fi
 
envsubst < ./config-template.yml \
  > "$PISTEREO_CONFIG"/.librespot/config.yml

./go-librespot --config_dir "$PISTEREO_CONFIG"/.librespot/

