#!/bin/bash

set -e

echo "Parando todos os serviços Docker Compose..."
docker-compose down

echo "Todos os serviços foram parados."