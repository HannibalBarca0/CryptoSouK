#!/bin/bash

# Nom du fichier : start.sh

# Couleurs pour une meilleure lisibilité
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Démarrage de CryptoSouK...${NC}"

# 1. Démarrer PostgreSQL
echo -e "${GREEN}1. Démarrage de PostgreSQL...${NC}"
sudo service postgresql start

# 2. Vérifier le statut de PostgreSQL
echo -e "${GREEN}2. Vérification du statut PostgreSQL...${NC}"
sudo service postgresql status

# 3. Configuration de la base de données
echo -e "${GREEN}3. Configuration de la base de données...${NC}"
cd backend
python3 -c "
from database import Base, engine
from models import User, CryptoPortfolio
Base.metadata.create_all(bind=engine)
"

# 4. Migrations Alembic
echo -e "${GREEN}4. Application des migrations Alembic...${NC}"
alembic upgrade head

# 5. Démarrer le backend FastAPI
echo -e "${GREEN}5. Démarrage du backend FastAPI...${NC}"
uvicorn app:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# 6. Démarrer le frontend Next.js
echo -e "${GREEN}6. Démarrage du frontend Next.js...${NC}"
cd ../frontend
npm run build
npm run dev &
FRONTEND_PID=$!

echo -e "${BLUE}CryptoSouK est en cours d'exécution :${NC}"
echo -e "Backend : http://localhost:8000"
echo -e "Frontend : http://localhost:3000"

# Gestion de l'arrêt propre
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT

# Maintenir le script en vie
wait