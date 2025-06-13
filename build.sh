#!/bin/bash

docker buildx build -f ./"$1"/Dockerfile \
   -t guidcruncher/pistereo2-mediaserver:alsa-latest \
   --platform linux/arm64 \
   --pull --push \
   "${@:2}" .
