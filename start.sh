#!/bin/bash

set -e

# Criar arquivo .env se não existir, copiando de .env.example
if [ ! -f .env ]; then
  echo "Arquivo .env não encontrado. Criando uma cópia de .env.example..."
  cp .env.example .env
else
  echo "Arquivo .env já existe."
fi

# Subir banco de datos
echo "Iniciando o banco de dados..."
docker-compose up -d db

# Esperar até o banco de dados estar pronto
echo "Aguardando o banco de dados ficar pronto..."
until docker exec db pg_isready -U postgres > /dev/null 2>&1; do
  echo "Postgres ainda não está pronto. Aguardando..."
  sleep 2
done

echo "Banco de dados pronto!"


# Rodar as migrations com Alembic
echo "Executando migrations com Alembic..."
docker-compose run --rm backend alembic upgrade head

# Subir os demais serviços
echo "Iniciando os serviços..."
docker-compose up -d