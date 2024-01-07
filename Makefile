# Makefile

.DEFAULT_GOAL := all

build:
	docker-compose up --build -d && \
	docker exec -it backend bash

all:
	docker-compose up --build -d && \
	docker-compose logs -f backend

execbackend:
	docker exec -it backend /bin/bash

execfrontend:
	docker exec -it frontend /bin/bash

up:
	docker-compose up
down:
	docker-compose down

.PHONY: build up down
