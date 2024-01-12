# Makefile

.DEFAULT_GOAL := all

all:
	docker-compose up --build -d && \


execbackend:
	docker exec -it backend /bin/bash


execfrontend:
	docker exec -it frontend /bin/bash

exenginx:
	docker exec -it nginx /bin/bash


re_backend:
	docker compose stop backend
	docker rmi -f $(docker images | grep backend | awk '{print $3}')
	docker compose up -d --build backend


re_frontend:
	docker compose stop frontend
	docker rmi -f $(docker images | grep frontend | awk '{print $3}')
	docker compose up -d --build frontend

# carefull :D
fclean:
	docker system prune -af


.PHONY: build up down
