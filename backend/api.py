from flask import Flask, jsonify, request, json, session
from flask_session import Session
from flask_cors import CORS
from random import randrange
from flask_sqlalchemy import SQLAlchemy
import fastf1
import requests
import datetime

app = Flask(__name__)
# app.config["SESSION_PERMANENT"] = True
SESSION_TYPE = "filesystem"
app.config.from_object(__name__)
Session(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
app.config['SQLALCHEMY_BINDS'] = {
    "year": "sqlite:///year.db",
    "race": "sqlite:///race.db",
    "event": "sqlite:///event.db",
    "driver": "sqlite:///driver.db",
}
db = SQLAlchemy(app)
CORS(app)
fastf1.Cache.enable_cache('../f1_cache')
# global g_selected_year


class Year(db.Model):
    __bind_key__ = 'year'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(80), unique=False)

    def __str__(self):
        return f'{self.id} {self.content}'


class Race(db.Model):
    __bind_key__ = 'race'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(80), unique=True)

    def __str__(self):
        return f'{self.id} {self.content}'


class Event(db.Model):
    __bind_key__ = 'event'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(80), unique=True)

    def __str__(self):
        return f'{self.id} {self.content}'


class Driver(db.Model):
    __bind_key__ = 'driver'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(80), unique=True)

    def __str__(self):
        return f'{self.id}, {self.content}'


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)

    def __str__(self):
        return f'{self.id} {self.content}'


db.create_all()
db.session.commit()


def serializer(todo):
    return {'id': todo.id,
            'content': todo.content}


@app.route('/api/getyear', methods=['GET'])
def getyear():
    try:
        # Year.query.filter_by(id=2).first()
        Year.query.all()
        db.drop_all(bind='year')
        db.create_all(bind='year')
    except:
        db.create_all(bind='year')
        db.drop_all(bind='year')
        db.create_all(bind='year')

    for year in range(2018, datetime.datetime.now().year+1):
        db.session.add(Year(content=year))
    db.session.commit()
    return jsonify([*map(serializer, Year.query.all())])


@app.route('/api/getrace', methods=['GET'])
def getrace():
    return jsonify([*map(serializer, Race.query.all())])


@app.route('/api/getevent', methods=['GET'])
def getevent():
    return jsonify([*map(serializer, Event.query.all())])


@app.route('/api/getdriver', methods=['GET'])
def getdriver():
    return jsonify([*map(serializer, Driver.query.all())])


@app.route('/api/selectyear', methods=['POST'])
def selectyear():
    if request.method == 'POST':
        selected_year = request.get_json(force=True)
        session['selected_year'] = selected_year
        # app.logger.info(type(session_selection))
        unformatted_names = requests.get(
            "http://ergast.com/api/f1/{}/circuits".format(selected_year)).text.split('<CircuitName>')[1:]
        circuit_list = [x.split('</CircuitName>')[0]
                        for x in unformatted_names]
        db.create_all(bind='race')
        db.drop_all(bind='race')
        db.create_all(bind='race')
        for race in circuit_list:
            db.session.add(Race(content=race))
        db.session.commit()
        return {"201": selected_year}


@app.route('/api/selectrace', methods=['POST'])
def selectrace():
    if request.method == 'POST':
        selected_race = request.get_json(force=True)
        if not 'selected_year' in session:
            session['selected_year'] = 2021
        selected_year = session.get('selected_year', None)
        # app.logger.info()
        f1_session = fastf1.get_event(int(selected_year), selected_race)
        f1_session_list = [f1_session['Session1'], f1_session['Session2'],
                           f1_session['Session3'], f1_session['Session4'], f1_session['Session5']]
        db.create_all(bind='event')
        db.drop_all(bind='event')
        db.create_all(bind='event')
        for event in f1_session_list:
            db.session.add(Event(content=event))
        db.session.commit()
        return {"201": selected_race}


@app.route('/api/selectevent', methods=['POST'])
def selectevent():
    if request.method == 'POST':
        event = request.get_json(force=True)
        return {"201": event}


@app.route('/api/lap_number_time')
def getChartData():
    return "pass"
    # return jsonify()


if __name__ == '__main__':
    app.run(debug=True)
