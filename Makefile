NETWORK_NAME = app_network

.PHONY: up create-network

up: create-network 
	docker-compose -f docker-compose.dev.yml up -d

down:
	docker-compose -f docker-compose.dev.yml down

again: create-network 
	docker-compose -f docker-compose.dev.yml down
	docker-compose -f docker-compose.dev.yml up -d --build

create-network:
	@if [ -z $$(docker network ls -q -f name=$(NETWORK_NAME)) ]; then \
		docker network create $(NETWORK_NAME); \
	fi

test:
	yarn && yarn test