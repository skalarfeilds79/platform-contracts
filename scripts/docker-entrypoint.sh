#!/usr/bin/env bash

set -euo pipefail

if [[ "${NODE_ENV:-}" == "development" ]]; then
  yarn watch
else
  env > .env
  yarn deploy:all
fi
