FROM nginx:1.25.3

EXPOSE 80
EXPOSE 443

CMD [ "service", "nginx", "start" ]