.PHONY: up
up:
	docker compose up --build --force-recreate --watch

.PHONY: down
down:
	docker compose down
