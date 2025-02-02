from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import RebalanceRequest, TradingBotRequest, UserPreferences

# Créer les tables dans la base de données
Base.metadata.create_all(bind=engine)

# Créer l'instance FastAPI
app = FastAPI()

# Dependency pour obtenir la session DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Route de test
@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API CryptoSouK"}

# Route de test avec DB
@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    return {"message": "Connexion à la base de données réussie"}

@app.post("/api/portfolio/rebalance")
async def rebalance_portfolio(request: RebalanceRequest):
    try:
        current_portfolio = request.current_portfolio
        target_allocation = request.target_allocation
        
        total_value = sum(current_portfolio.values())
        adjustments = {}
        
        for asset, target in target_allocation.items():
            current_value = current_portfolio.get(asset, 0)
            target_value = total_value * target
            adjustments[asset] = target_value - current_value
            
        return {"adjustments": adjustments}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/trading-bot")
async def run_trading_bot(request: TradingBotRequest):
    try:
        result = simulate_strategy(request.strategy, request.parameters)
        return {"success": True, "result": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

preferences_db = {}

@app.post("/api/preferences")
async def save_preferences(preferences: UserPreferences, db: Session = Depends(get_db)):
    try:
        preferences_db[preferences.user_id] = preferences.dict()
        return {"message": "Préférences enregistrées"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/preferences/{user_id}")
async def get_preferences(user_id: str, db: Session = Depends(get_db)):
    try:
        return preferences_db.get(user_id, {"widgets": [], "layout": {}, "theme": "light"})
    except Exception as e:
        raise HTTPException(status_code=404, detail="Préférences non trouvées")