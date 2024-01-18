#!/bin/bash

service nginx status

sed -i 's|${FRONTEND_URL}|'${FRONTEND_URL}'|g' /etc/nginx/sites-available/backend
sed -i 's|${BACKEND_URL}|'${BACKEND_URL}'|g' /etc/nginx/sites-available/backend
sed -i 's|${SERVER}|'${SERVER}'|g' /etc/nginx/sites-available/backend

echo ${FRONTEND_URL}
echo ${BACKEND_URL}
echo ${SERVER}

openssl req -x509 -nodes -new -sha256 -days 1024 -newkey rsa:2048 -keyout /etc/ssl/localhost.key -out /etc/ssl/localhost.pem -subj "/C=DE/CN=localhost"
openssl x509 -outform pem -in /etc/ssl/localhost.pem -out /etc/ssl/localhost.crt

cd /etc/nginx/sites-enabled

# PROTECTING AGAINST SYMLINK ATTACKS / ERRORS THAT IT ALREADY EXISTS
if [ ! -e ./backend ]; then
    ln -s ../sites-available/backend .
fi

service nginx restart
service nginx status
tail -f /dev/null