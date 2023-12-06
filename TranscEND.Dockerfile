
FROM debian:bookworm

WORKDIR /app

RUN		apt update 
RUN		apt install -y wget tar make build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev wget libbz2-dev
RUN		wget https://www.python.org/ftp/python/3.12.0/Python-3.12.0.tgz
RUN		tar xzf *.tgz && rm -f *.tgz
RUN		cd Python* && ./configure --enable-optimizations && make -j 2 && make altinstall
RUN 	apt install python3-pip -y
RUN		cd .. && rm -f Python-3.12.0

# RUN pip install -r requirements.txt

EXPOSE 8000


RUN apt install python3.11-venv -y
RUN python3 -m venv venv
RUN /bin/bash -c "source venv/bin/activate && echo 'source TranscEND/venv/bin/activate' >> /root/.bashrc"
# RUN pip install --no-cache-dir -r requirements.txt

# CMD ["tail", "-f", "/dev/null"]

# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]


# TO RUN 

# docker build -t transcend -f TranscEND.Dockerfile .

# docker run -v ${PWD}:/app/ -it transcend bash

# docker run -v ${PWD}:/app/ -p 8000:8000 --name TranscEND -it transcend bash