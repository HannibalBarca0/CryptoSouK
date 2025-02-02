from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
import datetime
from pydantic import BaseModel
from typing import Dict

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class CryptoPortfolio(Base):
    __tablename__ = "crypto_portfolios"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    crypto_symbol = Column(String, index=True)
    amount = Column(Float)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    user = relationship("User", back_populates="portfolios")

class RebalanceRequest(BaseModel):
    current_portfolio: Dict[str, float]
    target_allocation: Dict[str, float]

class TradingBotRequest(BaseModel):
    strategy: str
    parameters: Dict[str, float]

class UserPreferences(BaseModel):
    user_id: str
    widgets: list[str]
    layout: dict
    theme: str = "light"