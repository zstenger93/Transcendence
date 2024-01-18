#!/bin/bash

service nginx status

cp /app/docker/nginx/config/nginx.conf /etc/nginx/nginx.conf
cp /app/docker/nginx/config/backend.conf /etc/nginx/sites-available/backend

openssl req -x509 -nodes -new -sha256 -days 1024 -newkey rsa:2048 -keyout /etc/ssl/localhost.key -out /etc/ssl/localhost.pem -subj "/C=DE/CN=localhost"
openssl x509 -outform pem -in /etc/ssl/localhost.pem -out /etc/ssl/localhost.crt

cd /etc/nginx/sites-enabled

if [ ! -e ./backend ]; then
    ln -s ../sites-available/backend .
fi

service nginx restart
service nginx status
tail -f /dev/null