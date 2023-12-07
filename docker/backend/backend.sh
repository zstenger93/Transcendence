#!/bin/bash
cd /app/backend
apt install python3.11-venv -y
python3 -m venv venv
source venv/bin/activate
pip install --no-cache-dir django
echo 'source /app/venv/bin/activate' >> /root/.bashrc
python3 manage.py runserver 0.0.0.0:8000