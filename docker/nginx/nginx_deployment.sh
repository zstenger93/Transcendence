#!/bin/bash

service nginx status

sed -i 's|${FRONTEND_URL}|'${FRONTEND_URL}'|g' /etc/nginx/sites-available/backend
sed -i 's|${BACKEND_URL}|'${BACKEND_URL}'|g' /etc/nginx/sites-available/backend
sed -i 's|${SERVER}|'${SERVER}'|g' /etc/nginx/sites-available/backend

openssl req -x509 -nodes -new -sha256 -days 1024 -newkey rsa:2048 -keyout /etc/ssl/10.13.7.5.key -out /etc/ssl/10.13.7.5.pem -subj "/C=DE/CN=10.13.7.5"
openssl x509 -outform pem -in /etc/ssl/10.13.7.5.pem -out /etc/ssl/10.13.7.5.crt

cd /etc/nginx/sites-enabled

# PROTECTING AGAINST SYMLINK ATTACKS / ERRORS THAT IT ALREADY EXISTS
if [ ! -e ./backend ]; then
    ln -s ../sites-available/backend .
fi

service nginx restart
service nginx status
tail -f /dev/null