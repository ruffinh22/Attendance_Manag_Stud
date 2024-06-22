# app.py

import os
from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, Integer

from flask_sqlalchemy import SQLAlchemy

# Database configuration
db_host = "localhost:5432"
db_user = "lidruf"
db_pass = "janvier22"
database_name = "trivia"
datab_test = "trivia_test"

database_path = f"postgresql://{db_user}:{db_pass}@{db_host}/{database_name}"
database_test_path = f"postgresql://{db_user}:{db_pass}@{db_host}/{datab_test}"

def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)

# SQLAlchemy instance
db = SQLAlchemy()

def setup_db(app, database_path=database_path):
    """ Binds a Flask application and a SQLAlchemy service """
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    db.create_all()

# Models
class Question(db.Model):
    __tablename__ = 'questions'

    id = Column(Integer, primary_key=True)
    question = Column(String)
    answer = Column(String)
    category = Column(String)
    difficulty = Column(Integer)

    def __init__(self, question, answer, category, difficulty):
        self.question = question
        self.answer = answer
        self.category = category
        self.difficulty = difficulty

    def insert(self):
        db.session.add(self)
        db.session.commit()
    
    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
            'id': self.id,
            'question': self.question,
            'answer': self.answer,
            'category': self.category,
            'difficulty': self.difficulty
        }

class Category(db.Model):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True)
    type = Column(String)

    def __init__(self, type):
        self.type = type

    def format(self):
        return {
            'id': self.id,
            'type': self.type
        }

# Flask application instance
app = Flask(__name__)
setup_db(app)

# Example route
@app.route('/')
def index():
    return 'Hello, World! This is the Trivia API.'

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "success": False,
        "error": 404,
        "message": "Not found"
    }), 404

@app.errorhandler(422)
def unprocessable(error):
    return jsonify({
        "success": False,
        "error": 422,
        "message": "Unprocessable"
    }), 422

@app.errorhandler(400)
def bad_request(error):
    return jsonify({
        "success": False,
        "error": 400,
        "message": "Bad request"
    }), 400

# Ensure app.run() is called to start the Flask application
if __name__ == '__main__':
    app.run(debug=True)
