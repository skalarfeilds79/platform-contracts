#!/usr/bin/env bash

set -euxo pipefail

cp .env.example .env
docker-compose up -d
sleep 5
scripts/build-tools.sh docker-run deploy:all
scripts/build-tools.sh docker-run test
docker-compose down -v
