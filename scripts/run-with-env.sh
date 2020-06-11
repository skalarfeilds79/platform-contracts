#!/usr/bin/env bash

set -euo pipefail

# Create required .env file in docker
# TODO: Why can't we just read from then environment?
if [ ! -f .env ]; then
  env > .env
fi

${@:1}
