#!/bin/bash
cd /app/backend
apt install python3.11-venv -y
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python /app/backend/manage.py migrate

echo "Starting Django Server, Enjoy!"
python /app/backend/manage.py runserver 0.0.0.0:8000


hntestPassword!1