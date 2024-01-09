#!/bin/bash

cd /app/backend

apt install python3.11-venv -y

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
echo 'source /app/backend/venv/bin/activate' >> /root/.bashrc

echo "alias migrate='python manage.py makemigrations && python manage.py migrate'" >> /root/.bashrc
echo "alias get='http --follow --timeout 6'" >> /root/.bashrc

echo "Starting Django Server, Enjoy!!!"

mkdir -pv /var/{log,run}/gunicorn/
gunicorn -c config/gunicorn/dev.py # for logs: tail -f /var/log/gunicorn/dev.log


# python /app/backend/manage.py runserver 0.0.0.0:8000

# lsof -n -P -i TCP:8000 -s TCP:LISTEN

apt install nginx -y
service nginx start

openssl req -x509 -nodes -new -sha256 -days 1024 -newkey rsa:2048 -keyout docker/nginx/localhost.key -out docker/nginx/localhost.pem -subj "/C=DE/CN=localhost"
openssl x509 -outform pem -in docker/nginx/localhost.pem -out docker/nginx/localhost.crt

cat << EOF > /etc/nginx/sites-available/backend
server_tokens               off;
access_log                  /var/log/nginx/backend.access.log;
error_log                   /var/log/nginx/backend.error.log;

# This configuration will be changed to redirect to HTTPS later
server {
  server_name               localhost;
  listen                    80;
  location / {
    proxy_pass              http://localhost:8000;
    proxy_set_header        Host \$host;
  }
}
  location /static {
    autoindex on;
    alias /var/www/backend/static/;
  }
  
  listen 443 ssl;
  ssl_certificate ../nginx/localhost.crt;
  ssl_certificate_key ../nginx/localhost.key;
}
EOF

cd /etc/nginx/sites-enabled
ln -s ../sites-available/backend .

service nginx start
service nginx status

tail -f /var/log/gunicorn/dev.log