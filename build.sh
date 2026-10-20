#!/bin/sh
# Build the static site into _site/ (requires pandoc >= 2.x)
set -e
cd "$(dirname "$0")"
rm -rf _site
mkdir -p _site
cp -R assets _site/
pandoc content/index.md \
  --from markdown \
  --to html5 \
  --template template.html \
  --output _site/index.html
echo "Built _site/index.html"
