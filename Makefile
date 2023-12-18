# Makefile

.DEFAULT_GOAL := all

build:
	docker-compose up --build -d && \
	docker exec -it backend bash

all:
	docker-compose up --build -d && \
	docker-compose logs -f backend

exec:
	docker exec -it backend bash

up:
	docker-compose up
down:
	docker-compose down

.PHONY: build up down
