NODE_VERSION := 20
NPM := npm

# The default target that runs when you just type 'make'
# It depends on the 'preview-migration' target
.PHONY: all
all: preview-migration

# Target to ensure node_modules are installed
.PHONY: node_modules
node_modules:
	@echo "Checking for node_modules..."
	@if [ ! -d "node_modules" ]; then \
		echo "Installing dependencies..."; \
		$(NPM) install; \
	fi

.PHONY: check-node-version
check-node-version:
	@if ! command -v node >/dev/null 2>&1; then \
		echo "Node.js is not installed. Please install Node.js version $(NODE_VERSION) or higher."; \
		exit 1; \
	fi
	@current_version=$$(node -v | cut -d'v' -f2 | cut -d'.' -f1); \
	if [ $$current_version -lt $(NODE_VERSION) ]; then \
		echo "Node.js version $$current_version is lower than required version $(NODE_VERSION). Please update Node.js."; \
		exit 1; \
	fi

# Target to run the preview:migration command
.PHONY: preview-migration
preview-migration: check-node-version node_modules
	@echo "Running preview:migration..."
	$(NPM) run preview:migration


# Can be default or full, default will stop containers, full will stop containers and remove local images
CLEAN_OPTION ?= default

.PHONY: clean
clean:
	@echo "Stopping and removing Docker containers..."
	@if [ "$(CLEAN_OPTION)" = "full" ]; then \
		docker-compose --profile migration down --rmi local; \
	else \
		docker-compose --profile migration down; \
	fi

.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make                : Run the preview:migration command"
	@echo "  make clean          : Stop and remove Docker containers"
	@echo "  make clean CLEAN_OPTION=full : Stop, remove containers, and remove local images"
	@echo "  make help           : Display this help message"