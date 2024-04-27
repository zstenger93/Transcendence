# Makefile

.DEFAULT_GOAL := all


all:
	docker-compose up --build

runb:
	daphne -b 0.0.0.0 backend.asgi:application
# http://10.12.2.2:8000/chat/


execbackend:
	docker exec -it backend /bin/bash


execfrontend:
	docker exec -it frontend /bin/bash


execnginx:
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
