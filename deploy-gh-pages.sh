#!/bin/bash
set -e

echo "Deploying to gh-pages..."
cd out

# Initialize a new git repo for deployment
git init
git add -A
git commit -m "Deploy to GitHub Pages"

# Force push to the gh-pages branch of the remote
# We use the explicit remote URL to avoid issues if 'origin' isn't set in the sub-repo
git push -f git@github.com:treant-lab/website.git HEAD:gh-pages

echo "Deployment complete!"
cd ..
