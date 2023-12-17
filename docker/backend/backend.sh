#!/bin/bash
cd /app/backend
apt install python3.11-venv -y
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
<<<<<<< HEAD
python /app/backend/manage.py migrate
=======
>>>>>>> 77d3998f6cecbbc71dd3bdd1d0241fcb17574bd8

echo "Starting Django Server, Enjoy!"
python /app/backend/manage.py runserver 0.0.0.0:8000


hntestPassword!1