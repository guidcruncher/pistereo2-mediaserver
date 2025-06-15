#!/bin/bash

docker buildx build -f ./alsa/Dockerfile \
   -t guidcruncher/pistereo2-mediaserver:alsa-latest \
   --platform linux/arm64 \
   --pull --push \
   "${@:2}" .

docker buildx build -f ./pulseaudio/Dockerfile \
   -t guidcruncher/pistereo2-mediaserver:pulseaudio-latest \
   --platform linux/arm64 \
   --pull --push \
   "${@:2}" .

docker buildx build -f ./pipewire/Dockerfile \
   -t guidcruncher/pistereo2-mediaserver:pipewire-latest \
   --platform linux/arm64 \
   --pull --push \
   "${@:2}" .
