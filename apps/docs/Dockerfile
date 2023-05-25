#!/usr/bin/env bash

FROM nginx:1.17.1-alpine
COPY apps/docs/nginx.conf /etc/nginx/nginx.conf
COPY dist/apps/docs /usr/share/nginx/html
