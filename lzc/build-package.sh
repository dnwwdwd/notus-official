#!/bin/sh
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
WEBSITE_DIR="$ROOT_DIR/notus-website"
DIST_DIR="$ROOT_DIR/lzc-dist"

cd "$WEBSITE_DIR"
npm ci
npm run build

rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR/site" "$DIST_DIR/nginx"

cp -R "$WEBSITE_DIR/dist/." "$DIST_DIR/site/"
mkdir -p "$DIST_DIR/site/packages"
cp "$ROOT_DIR/packages/"* "$DIST_DIR/site/packages/"
cp "$ROOT_DIR/lzc/default.conf" "$DIST_DIR/nginx/default.conf"
