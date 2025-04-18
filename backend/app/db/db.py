import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.db.base import Base
from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_size=10, max_overflow=20)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

if os.getenv("ENV") != "development":
	Base.metadata.create_all(bind=engine)

def get_db():
	# Create a new session
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()