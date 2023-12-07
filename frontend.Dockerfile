FROM debian:bookworm

WORKDIR /app

RUN apt update && \
    apt install -y wget tar make build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev wget libbz2-dev && \
    wget https://www.python.org/ftp/python/3.12.0/Python-3.12.0.tgz && \
    tar xzf *.tgz && rm -f *.tgz && \
    cd Python* && ./configure --enable-optimizations && make -j 2 && make altinstall && \
    apt install python3-pip -y && \
    cd .. && rm -rf Python-3.12.0

RUN apt install python3.11-venv -y && \
    python3 -m venv venv && \
    . venv/bin/activate && \
    pip install --no-cache-dir django && \
    echo 'source /app/venv/bin/activate' >> /root/.bashrc

COPY frontend.sh /app/
RUN chmod +x /app/frontend.sh

EXPOSE 8000

ENTRYPOINT ["bash", "/app/frontend.sh"]
CMD ["python", "/app/frontend/manage.py", "runserver", "0.0.0.0:8000"]


# TO RUN 

# docker build -t transcend -f TranscEND.Dockerfile .

# docker run -v ${PWD}:/app/ -it transcend bash

# docker run -v ${PWD}:/app/ -p 8000:8000 --name TranscEND -it transcend bash
