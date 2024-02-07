# Set the subdirectory name for the dev-portal app
PREVIEW_DIR=website-preview

should_pull=true

# Clone the dev-portal project, if needed
if [ ! -d "$PREVIEW_DIR" ]; then
    echo "⏳ Cloning the dev-portal repo, this might take a while..."
    git clone --depth=1 https://github.com/hashicorp/dev-portal.git "$PREVIEW_DIR"
    should_pull=false
fi


cd "$PREVIEW_DIR"

# If the directory already existed, pull to ensure the dev-portal clone is fresh
if [ "$should_pull" = true ]; then
    git pull origin main
fi

# Run the dev-portal content-repo start script
REPO=waypoint PREVIEW_DIR="$PREVIEW_DIR" npm run start:local-preview
