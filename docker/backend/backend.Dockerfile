FROM debian:bookworm

WORKDIR /app

RUN     apt update && \
		apt install -y \
		tar \
		make \
		wget \
		zlib1g-dev \
		libssl-dev \
		libffi-dev \
		libbz2-dev \
		libgdbm-dev \
		libnss3-dev \
		libsqlite3-dev \
		libreadline-dev \
		libncurses5-dev \
		build-essential

RUN     wget https://www.python.org/ftp/python/3.12.0/Python-3.12.0.tgz
RUN     tar xzf *.tgz && rm -f *.tgz
RUN     cd Python* && ./configure --enable-optimizations && make -j 2 && make altinstall
RUN     apt install python3-pip -y
RUN     cd .. && rm -rf Python-3.12.0

# For Development
RUN     apt install lsof curl procps vim -y 

COPY    docker/backend/config/backend.conf /etc/nginx/sites-available/backend
COPY    docker/backend/config/nginx.conf /etc/nginx/nginx.conf

COPY    docker/backend/backend.sh /app/
RUN     chmod +x /app/backend.sh

EXPOSE  443
EXPOSE  80

ENTRYPOINT  ["docker/backend/backend.sh"]
