# The default target that runs when you just type 'make'
# It depends on the 'preview-unified-docs' target
.PHONY: all
all: unified-docs

# Target to run the preview:migration command
.PHONY: unified-docs
unified-docs:
	@echo "Running preview:unified-docs..."
	docker compose --profile unified-docs up --build

# Can be default or full, default will stop containers, full will stop containers and remove local images
CLEAN_OPTION ?= default

.PHONY: clean
clean:
	@echo "Stopping and removing Docker containers..."
	@if [ "$(CLEAN_OPTION)" = "full" ]; then \
		docker-compose --profile unified-docs down --rmi local; \
	else \
		docker-compose --profile unified-docs down; \
	fi

.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make                : Run the docker-compose --profile unified-docs"
	@echo "  make clean          : Stop and remove Docker containers"
	@echo "  make clean CLEAN_OPTION=full : Stop, remove containers, and remove local images"
	@echo "  make help           : Display this help message"
