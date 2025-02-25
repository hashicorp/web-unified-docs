.PHONY: all
all: unified-docs

.PHONY: unified-docs
unified-docs:
	@echo "Starting up the unified-docs Docker container"
	docker compose --profile unified-docs up

.PHONY: clean
clean:
	@echo "Stopping and removing Docker containers and images..."
	docker compose --profile unified-docs down --rmi local; \
	docker rmi hashicorp/dev-portal --force
	@echo "Removing public/content and public/assets directories..."
	rm -rf public/content public/assets

.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make                : Run the unified-docs Docker container"
	@echo "  make clean          : Stop and remove project Docker containers and images"
	@echo "  make help           : Display this help message"
