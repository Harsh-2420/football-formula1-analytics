from flask import Flask, jsonify, request, json, session
# from flask_session import Session
from flask_cors import CORS
from random import randrange
from flask_sqlalchemy import SQLAlchemy
import fastf1
import requests
import datetime
from datetime import timedelta
from set_values import driver_key_val_pair

app = Flask(__name__)
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=1)
app.config['SESSION_FILE_THRESHOLD'] = 5
app.config["SECRET_KEY"] = "OCML3BRawWEUeaxcuKHLpw"
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
    content = db.Column(db.String(80), unique=True)

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
    curr_year = datetime.datetime.now().year+1
    year_db_len = len(Year.query.all())
    latest_entry = Year.query.filter_by(id=year_db_len).first().content
    if str(latest_entry) > str(curr_year):
        db.session.add(
            Year(content=(int(latest_entry)+1)))
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

        session['YEAR'] = str(selected_year)
        print("######################"+str(session))
        # app.logger.info(type(selected_year))

        f1_season = fastf1.get_event_schedule(int(selected_year))
        event_records = f1_season[['RoundNumber', 'EventName']]
        circuit_list = list(
            f1_season['EventName'][datetime.datetime.now() > f1_season['Session5Date']])
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
        # selected_year = session.get("YEAR")
        selected_year = 2021
        f1_session = fastf1.get_event(selected_year, selected_race)
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
        selected_event = request.get_json(force=True)
        selected_year = 2021
        selected_race = "Bahrain Grand Prix"
        round_number = 1
        # get event_records from session
        # get round number after getting session:
        # round_number = event_records[event_records['EventName'] == selected_race]['RoundNumber']
        driver_list = [x[:3] for x in requests.get(
            "http://ergast.com/api/f1/{}/{}/drivers".format(selected_year, round_number)).text.split('code="')[1:]]
        db.create_all(bind='driver')
        db.drop_all(bind='driver')
        db.create_all(bind='driver')
        for driver in driver_list:
            db.session.add(Driver(content=driver))
        db.session.commit()
        return {"201": selected_event}


@app.route('/api/selectdriver', methods=['POST'])
def selectdriver():
    if request.method == 'POST':
        # list of multi select drivers (real-time changes)
        selected_drivers = request.get_json(force=True)
        # session send selected_drivers
        return {"201": selected_drivers}


@app.route('/api/lap_number_time')
def getChartData():
    data = [
        {
            "LapNumber": '0',
            "44": "0 days 00:01:27.440000",
            "6": "0 days 00:01:27.313000",
        },
        {
            "name": '1',
            "44": "0 days 00:01:27.504000",
            "6":  "0 days 00:01:28.126000",
        }]
    data_nano = [{
        "LapNumber": '0',
        "44": 87440000000,
        "6": 87313000000},
        {"LapNumber": '1',
         "44": 88982000000,
         "6":  87504000000
         }]
    data_milli = [{
        "LapNumber": '0',
        "44": 87440,
        "6": 87313},
        {"LapNumber": '1',
         "44": 88982,
         "6":  87504
         }]
    # selected_year = 2021
    # selected_race = "Bahrain Grand Prix"
    # selected_event = "Race"
    # round_number = 1
    # selected_drivers = ['HAM', 'ALO', 'LAT']

    # selected_data = [driver_key_val_pair[x]
    #                  for x in selected_drivers]
    # selected_data.append("LapNumber")

    # fastf1_session = fastf1.get_session(
    #     selected_year, selected_race, selected_event)
    # fastf1_session.load(telemetry=True, laps=True, weather=False)

    # lap_time_number = fastf1_session.laps.iloc[:, 1:4].copy()
    # lap_time_number_piv = lap_time_number.pivot(
    #     index="LapNumber", columns='DriverNumber', values='LapTime').rename_axis(None, axis=1).reset_index()
    # lap_time_number_cov = lap_time_number_piv[selected_data].fillna(
    #     timedelta(0)).to_dict('records')
    # return json.dumps(lap_time_number_cov, indent=4, sort_keys=True, default=str)
    return jsonify(data_milli)


if __name__ == '__main__':
    app.run(debug=True)
