#!/bin/bash


############################################
# python environment                       #
############################################
cd /app/backend

apt install python3.11-venv -y

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
echo 'source /app/backend/venv/bin/activate' >> /root/.bashrc

echo "alias migrate='python manage.py makemigrations && python manage.py migrate'" >> /root/.bashrc
echo "alias get='http --follow --timeout 6'" >> /root/.bashrc


############################################
# gunicorn server                          #
############################################
mkdir -pv /var/{log,run}/gunicorn/
tail -f "/dev/null"
cd backend && gunicorn -c config/gunicorn/dev.py

tail -f /var/log/gunicorn/dev.log


# todo:  
# oragnize structure: nginx.conf, sites-available.conf certs location 
# check cors problem
# setup a firewall only 443 is allowd and 80 is redirected to 443
# change ip to environment variable
# check the redirect loop
# make it frontend compatible
# add a rebuild rule in makefile
# change workdir from /app to /app/backend


