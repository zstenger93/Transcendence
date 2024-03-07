#!/bin/bash


############################################
# python environment                       #
############################################

apt install python3.11-venv -y

if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt

echo 'source /app/backend/venv/bin/activate' >> /root/.bashrc

echo "alias migrate='python manage.py makemigrations && python manage.py migrate'" >> /root/.bashrc
echo "alias get='http --follow --timeout 6'" >> /root/.bashrc


# ############################################
# # gunicorn server                          #
# ############################################
# mkdir -pv /var/{log,run}/gunicorn/
# gunicorn -c config/gunicorn/dev.py --reload
# sleep 5
# python manage.py makemigrations && python manage.py migrate
# tail -f /var/log/gunicorn/dev.log



############################################
# daphne server                            #
############################################
mkdir -pv /var/{log,run}/daphne/
python manage.py makemigrations && python manage.py migrate
daphne -u /tmp/daphne.sock backend.asgi:application
#
# watchmedo auto-restart -d . -p "*.py" -- daphne -b 0.0.0.0 backend.asgi:application
daphne -b 0.0.0.0 backend.asgi:application
#
# tail -f /var/log/daphne/daphne.log


# hang the container
# tail -f /dev/null
