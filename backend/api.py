from models import Year, Race, Event, Driver, serializer
from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from random import randrange
import fastf1
import session
import requests

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
app.config['SQLALCHEMY_BINDS'] = {
    "year": "sqlite:///year.db",
    "race": "sqlite:///race.db",
    "event": "sqlite:///event.db",
    "driver": "sqlite:///driver.db",
}
db = SQLAlchemy(app)
db.create_all()
CORS(app)
fastf1.Cache.enable_cache('../f1_cache')


@app.route('/api/getyear', methods=['GET'])
def getyear():
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
        year = request.get_json(force=True)
        unformatted_names = requests.get(
            "http://ergast.com/api/f1/{}/circuits".format(year)).text.split('<CircuitName>')[1:]
        circuit_list = [x.split('</CircuitName>')[0]
                        for x in unformatted_names]
        db.drop_all(bind='race')
        for race in circuit_list:
            db.session.add(Race(content=race))
        db.session.commit()
        return {"201": year}


@app.route('/api/selectrace', methods=['POST'])
def selectrace():
    if request.method == 'POST':
        race = request.get_json(force=True)
        # db.session.add(Race(content='Singapore'))
        # db.session.commit()
        app.logger.info(str("#######################" + race))
        return {"201": race}


@app.route('/api/selectevent', methods=['POST'])
def selectevent():
    if request.method == 'POST':
        event = request.get_json(force=True)
        # db.session.add(Event(content=request_data))
        # db.session.commit()
        return {"201": event}


@app.route('/api/lap_number_time')
def getChartData():
    pass
    # return jsonify()


if __name__ == '__main__':
    app.run(debug=True)
