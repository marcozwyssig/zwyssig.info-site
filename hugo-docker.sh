#!/usr/bin/env bash
# Build or locally preview the site with the Hugo (extended) Docker image —
# no local Hugo install needed.
#
#   ./hugo-docker.sh build   -> builds the production site into docs/ (--gc --minify)
#   ./hugo-docker.sh serve   -> live preview at http://localhost:1313 (Ctrl+C to stop)
#
# Override the image with:  HUGO_IMAGE=ghcr.io/gohugoio/hugo:0.164.0 ./hugo-docker.sh build
set -euo pipefail

IMAGE="${HUGO_IMAGE:-ghcr.io/gohugoio/hugo:latest}"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
UIDGID="$(id -u):$(id -g)"

case "${1:-serve}" in
  build)
    echo "→ Building into docs/ via $IMAGE ..."
    docker run --rm -u "$UIDGID" -e HUGO_CACHEDIR=/tmp/hugo_cache \
      -v "$DIR:/src" -w /src "$IMAGE" --gc --minify
    echo "✓ Done — output in $DIR/docs"
    ;;
  serve)
    echo "→ Live preview at http://localhost:1313  (Ctrl+C to stop) via $IMAGE ..."
    docker run --rm -it -u "$UIDGID" -e HUGO_CACHEDIR=/tmp/hugo_cache \
      -v "$DIR:/src" -w /src -p 1313:1313 "$IMAGE" \
      server --bind 0.0.0.0 --port 1313 --baseURL http://localhost
    ;;
  *)
    echo "Usage: $0 [build|serve]" >&2
    exit 1
    ;;
esac
