#!/bin/bash

docker buildx build -f ./Dockerfile \
   -t guidcruncher/pistereo2-mediaserver:alsa-latest \
   --platform linux/arm64 \
   --pull --push \
   $@ .
