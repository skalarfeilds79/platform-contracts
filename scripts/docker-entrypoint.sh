#!/usr/bin/env bash

set -euo pipefail

if [[ "${NODE_ENV:-}" == "development" ]]; then
  yarn watch
else
  yarn deploy:all
fi
