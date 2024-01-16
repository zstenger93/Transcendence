FROM debian:bookworm

RUN apt update && apt install -y openssl nginx

WORKDIR /app

COPY ./nginx.sh /app/

RUN chmod +x /app/nginx.sh
# Gunicorn
EXPOSE 8000
# Node
EXPOSE 3000
# Nginx
EXPOSE 80
# Nginx SSL
EXPOSE 443

CMD [ "nginx", "-g", "daemon off;" ]

ENTRYPOINT [ "/app/nginx.sh" ]