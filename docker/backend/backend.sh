#!/bin/bash
cd /app/backend
apt install python3.11-venv -y
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

echo "Starting Django Server, Enjoy!"
python /app/backend/manage.py runserver 0.0.0.0:8000

echo "source backend/venv/bin/activate" >> /root/.bashrc

# hntestPassword!1