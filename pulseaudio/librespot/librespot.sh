#!/bin/sh
mkdir -p "$PISTEREO_CONFIG"/.librespot

export PISTEREO_CLIENTSECRET=""

if [ -f "/run/secrets/PISTEREO_CLIENTSECRET" ]; then
  export PISTEREO_CLIENTSECRET="$(cat /run/secrets/PISTEREO_CLIENTSECRET)"
fi

configfilename="$PISTEREO_CONFIG"/configuration.env
if [ -f "$configfilename" ]; then
  dotenv -o -e "$configfilename" -- envsubst < ./config-template.yml \
  > "$PISTEREO_CONFIG"/.librespot/config.yml
else
  envsubst < ./config-template.yml \
  > "$PISTEREO_CONFIG"/.librespot/config.yml
fi

./go-librespot --config_dir "$PISTEREO_CONFIG"/.librespot/

