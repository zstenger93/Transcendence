#!/bin/bash

cd /app/backend

apt install python3.11-venv -y

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
echo 'source /app/backend/venv/bin/activate' >> /root/.bashrc

echo "alias migrate='python manage.py makemigrations && python manage.py migrate'" >> /root/.bashrc
echo "alias get='http --follow --timeout 6'" >> /root/.bashrc

echo "Starting Django Server, Enjoy!"
tail -f /dev/null

# gunicorn -c config/gunicorn/dev.py # for logs: tail -f /var/log/gunicorn/dev.log

# python /app/backend/manage.py runserver 0.0.0.0:8000

# lsof -n -P -i TCP:8000 -s TCP:LISTEN

# tail -f /var/log/gunicorn/dev.log