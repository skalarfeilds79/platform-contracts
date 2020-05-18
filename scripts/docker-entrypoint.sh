#!/usr/bin/env bash

set -euo pipefail

# Create required .env file in docker
# TODO: Why can't we just read from then environment?
if [ ! -f .env ]; then
  env > .env
fi

yarn deploy:all

if [[ "${WATCH:-}" == "true" ]]; then
  yarn watch
fi
