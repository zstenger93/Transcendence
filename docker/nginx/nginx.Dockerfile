FROM debian:bookworm

RUN apt update && apt install -y openssl nginx

WORKDIR /app

EXPOSE 80
EXPOSE 443


CMD [ "nginx", "-g", "daemon off;" ]