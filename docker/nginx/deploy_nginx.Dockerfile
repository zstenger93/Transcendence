FROM debian:bookworm

RUN apt update && apt install -y openssl nginx

WORKDIR /app

COPY ./nginx.sh /app/
COPY ./config/nginx.conf /etc/nginx/nginx.conf
COPY ./config/backend.conf /etc/nginx/sites-available/backend
COPY ./config/frontend.conf /etc/nginx/sites-available/frontend

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