from hashlib import new
from flask import Flask, jsonify, request, json, session
from flask_session import Session
from flask_cors import CORS
import json
from random import randrange
from flask_sqlalchemy import SQLAlchemy
import fastf1
import fastf1.plotting
import pandas as pd
import requests
import datetime
from datetime import timedelta
from set_values import driver_key_val_pair, team_color_pair
import pandas as pd
import numpy as np
import csv
import re
from bs4 import BeautifulSoup
import urllib.request
from scipy import stats
# import asyncio

app = Flask(__name__)

# Flask Session config
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=1)
app.config['SESSION_TYPE'] = 'filesystem'
# app.config['SESSION_FILE_DIR'] = './flask_session/'
app.config['SESSION_FILE_THRESHOLD'] = 5
app.config["SECRET_KEY"] = "OCML3BRawWEUeaxcuKHLpw"
app.config['SESSION_COOKIE_NAME'] = "F1 Cookie"
app.config['UPLOAD_FOLDER'] = './databases/'
Session(app)

# SQL Alchemy config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
app.config['SQLALCHEMY_BINDS'] = {
    "year": "sqlite:///year.db",
    "race": "sqlite:///race.db",
    "event": "sqlite:///event.db",
    "driver": "sqlite:///driver.db",
    "selections": "sqlite:///selections.db",
}
db = SQLAlchemy(app)
CORS(app)
fastf1.Cache.enable_cache('./f1_cache')
# global g_selected_year


class Year(db.Model):
    __bind_key__ = 'year'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(80), unique=True)

    def __str__(self):
        return f'{self.id} {self.content}'


class Selections(db.Model):
    __bind_key__ = 'selections'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(80), unique=True)
    # driver_list = db.Column(db.JSON, unique=True)

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
db.drop_all(bind='selections')
db.session.commit()


def serializer(todo):
    return {'id': todo.id,
            'content': todo.content}


'''
F1 ROUTES
'''


@app.route('/formula/getyear', methods=['GET'])
def getyear():
    curr_year = datetime.datetime.now().year+1
    year_db_len = len(Year.query.all())
    latest_entry = Year.query.filter_by(id=year_db_len).first().content
    if str(latest_entry) > str(curr_year):
        db.session.add(
            Year(content=(int(latest_entry)+1)))
    db.session.commit()
    return jsonify([*map(serializer, Year.query.all())])


@app.route('/formula/getrace', methods=['GET'])
def getrace():
    # if not Selections.query.all():
    #     return jsonify([])
    return jsonify([*map(serializer, Race.query.all())])


@app.route('/formula/getevent', methods=['GET'])
def getevent():
    # if len(Selections.query.all()) <= 2:
    #     return jsonify([])
    return jsonify([*map(serializer, Event.query.all())])


@app.route('/formula/getdriver', methods=['GET'])
def getdriver():
    return jsonify([*map(serializer, Driver.query.all())])


@app.route('/formula/selectyear', methods=['POST'])
def selectyear():
    if request.method == 'POST':
        selected_year = request.get_json(force=True)

        session['YEAR'] = str(selected_year)
        # print("######################"+str(session))
        # selected_year_session = session.get("YEAR")
        # app.logger.info(type(selected_year_session))

        # Setting up Selections db
        db.create_all(bind='selections')
        if not Selections.query.all():
            db.session.add(Selections(id=1, content=selected_year))
            db.session.commit()
        else:
            db.drop_all(bind='selections')
            db.create_all(bind='selections')
            db.session.add(Selections(id=1, content=selected_year))
            db.session.commit()

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


@app.route('/formula/selectrace', methods=['POST'])
def selectrace():
    if request.method == 'POST':
        selected_race = request.get_json(force=True)
        session['RACE'] = str(selected_race)
        # selected_year = session.get("YEAR")
        # app.logger.info(selected_year)
        # selected_year = 2021

        # Setting up Selections db
        db.create_all(bind='selections')
        if len(Selections.query.all()) < 2:
            db.session.add(Selections(id=2, content=selected_race))
        else:
            for i in range(2, len(Selections.query.all())+1):
                Selections.query.filter_by(id=i).delete()
            db.session.add(Selections(id=2, content=selected_race))
        db.session.commit()
        selected_year = Selections.query.filter_by(id=1).first().content
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


@app.route('/formula/selectevent', methods=['POST'])
def selectevent():
    if request.method == 'POST':
        selected_event = request.get_json(force=True)
        # selected_year = 2021
        # selected_race = "Bahrain Grand Prix"

        # Setting up Selections db
        db.create_all(bind='selections')
        if len(Selections.query.all()) < 3:
            db.session.add(Selections(id=3, content=selected_event))
        else:
            for i in range(3, len(Selections.query.all())+1):
                Selections.query.filter_by(id=i).delete()
            db.session.add(Selections(id=3, content=selected_event))

        selected_year = Selections.query.filter_by(id=1).first().content
        selected_race = Selections.query.filter_by(id=2).first().content

        # selected_year = session.get("YEAR")
        # selected_race = session.get("RACE")
        # round_number = 1

        f1_season = fastf1.get_event_schedule(int(selected_year))
        event_records = f1_season[['RoundNumber', 'EventName']]
        round_number = pd.DataFrame(event_records)[event_records['EventName']
                                                   == selected_race]['RoundNumber']

        driver_list = [x[:3] for x in requests.get(
            "http://ergast.com/api/f1/{}/{}/drivers".format(selected_year, round_number.iloc[0])).text.split('code="')[1:]]
        db.create_all(bind='driver')
        db.drop_all(bind='driver')
        db.create_all(bind='driver')
        for driver in driver_list:
            db.session.add(Driver(content=driver))
        db.session.commit()
        return {"201": selected_event}


@app.route('/formula/selectdriver', methods=['POST'])
def selectdriver():
    if request.method == 'POST':
        selected_drivers = request.get_json(force=True)
        new_s = ''.join(selected_drivers)
        db.create_all(bind='selections')
        if len(Selections.query.all()) < 4:
            try:
                Selections.query.filter_by(id=4).delete()
                db.session.add(Selections(id=4, content=new_s))
            except:
                db.session.add(Selections(id=4, content=new_s))
            db.session.commit()
        else:
            for i in range(4, len(Selections.query.all())+1):
                Selections.query.filter_by(id=i).delete()
                db.session.commit()
            db.session.add(Selections(id=4, content=new_s))
        db.session.commit()
        # app.logger.info(
        #     "##########", Selections.query.filter_by(id=4).first().content)
        return {"201": selected_drivers}


@app.route('/formula/lap_number_time')
def getChartData():
    # Get Data from Sessions
    selected_year = 2022
    selected_race = "Bahrain Grand Prix"
    selected_event = "Race"
    selected_drivers = ["HAM", 'LEC']

    # How to Wait until options are selected?
    # selected_year = Selections.query.filter_by(id=1).first().content
    # selected_race = Selections.query.filter_by(id=2).first().content
    # selected_event = Selections.query.filter_by(id=3).first().content
    # # try:
    # new_s = Selections.query.filter_by(id=4).first().content
    # # selected_drivers = json.loads(new_s)
    # selected_drivers = []
    # for index in range(0, len(new_s), 3):
    #     selected_drivers.append(new_s[index: index + 3])

    # Call the API with data
    fastf1_session = fastf1.get_session(
        int(selected_year), selected_race, selected_event)
    fastf1_session.load(telemetry=False, laps=True, weather=False)

    lap_time_number = fastf1_session.laps[[
        'Driver', 'LapTime', 'Compound', 'TyreLife', 'LapNumber']].copy()
    lap_time_number = lap_time_number[lap_time_number['Driver'].isin(
        selected_drivers)]
    lap_time_number['LapTime'] = lap_time_number['LapTime'].fillna(
        timedelta(0))
    lap_time_number['Year'] = selected_year
    lap_time_number['Compound'] = lap_time_number['Compound'].fillna("")
    lap_time_number['TyreLife'] = lap_time_number['TyreLife'].fillna(-1)
    lap_time_number['LapTime'] = pd.to_numeric(
        lap_time_number['LapTime'])/1000000
    final_list = []
    for driver in selected_drivers:
        temp = lap_time_number[lap_time_number['Driver'] == driver]
        tempdf = temp[(np.abs(stats.zscore(temp['LapTime'])) < 0.25)]
        final_list.append(tempdf)
    final_df = pd.concat(final_list)

    # lap_time_number = lap_time_number[(
    #     np.abs(stats.zscore(lap_time_number['LapTime'])) < 0.75)]
    # TimeDelta
    lap_time_number_cov = final_df.to_dict('records')
    final_dict = {}
    for data in lap_time_number_cov:
        primary_key = data['Driver']
        data[primary_key] = data.pop('LapTime')

        driv_lap = fastf1_session.laps.pick_driver(primary_key).pick_fastest()
        try:
            team = driv_lap['Team']
            color = team_color_pair[team]
        except:
            color = "#ffffff"
        data['color'] = color

        if primary_key not in final_dict:
            final_dict[primary_key] = [data]
        else:
            final_dict[primary_key].append(data)
    return jsonify(final_dict)


@app.route('/formula/speed_distance')
def speed_distance():
    selected_year = 2022
    selected_race = "Bahrain Grand Prix"
    selected_event = "Race"
    round_number = 1
    selected_drivers = ['VER', 'LEC']
    fastf1_session = fastf1.get_session(
        selected_year, selected_race, selected_event)
    fastf1_session.load(telemetry=True, laps=True, weather=False)

    df = pd.DataFrame()
    driv_df_list = []
    for driver in selected_drivers:
        driv_lap = fastf1_session.laps.pick_driver(driver).pick_fastest()
        color = fastf1.plotting.team_color(driv_lap['Team'])
        driv_df = driv_lap.get_telemetry(
        )[['Speed', 'Distance', 'RPM', 'nGear', 'Throttle', 'Brake', 'DRS', 'X', 'Y']]

        driv_df['Brake'] = driv_df['Brake'].astype(int)
        driv_df['Distance'] = driv_df['Distance'].apply(np.round)
        driv_df['color'] = color
        driv_df['driver'] = driver
        driv_df_list.append(pd.DataFrame(
            driv_df).reset_index().drop(['index'], axis=1))

        for i in range(1, len(driv_df_list)):
            edges, labels = np.unique(
                driv_df_list[i]['Distance'], return_index=True)
            edges = np.r_[-np.inf, edges + np.ediff1d(edges, to_end=np.inf)/2]
            driv_df_list[0]['new_index'] = pd.cut(
                driv_df_list[0]['Distance'], bins=edges, labels=driv_df_list[i].index[labels])
            driv_df_list[0] = driv_df_list[0].join(
                driv_df_list[i], on='new_index', rsuffix=i)

        access_list = []
        rename_dict = {}
        for i in range(len(driv_df_list)):
            if i == 0:
                access_list.append('Speed')
                rename_dict['Speed'] = driv_df_list[0]['color'][0]
            else:
                access_list.append('Speed{}'.format(i))
                rename_dict['Speed{}'.format(
                    i)] = driv_df_list[0]['color{}'.format(i)][0]

        driv_df_list[0]['trackColor'] = driv_df_list[0][access_list].idxmax(
            axis=1)
        driv_df_list[0]['trackColor'] = driv_df_list[0]['trackColor'].map(
            rename_dict)
        driv_df_list[0] = driv_df_list[0][['Speed', 'Distance', 'RPM', 'nGear',
                                           'Throttle', 'Brake', 'DRS', 'X', 'Y', 'color', 'driver', 'trackColor']]
        return_dict = {}
        for i in range(len(driv_df_list)):
            if i != 0:
                driv_df_list[i]['trackColor'] = driv_df_list[0]['trackColor']
            return_dict[driv_df_list[i]['driver'].iloc[0]
                        ] = driv_df_list[i].to_dict('records')
    return jsonify([selected_race, return_dict])


@app.route('/formula/circuit_hist_features')
def analysis():
    races = pd.read_csv("./f1_data/races.csv")
    circ_history = races[['year', 'name']].to_dict('records')
    results = pd.read_csv("./f1_data/results.csv")
    quali_win_corr = pd.merge(results, races, on='raceId', how='left')[
        ['name', 'grid', 'position']]
    nan_q = quali_win_corr['position'].value_counts().keys()[0]
    quali_win_corr['position'].replace(nan_q, np.nan, inplace=True)
    quali_win_corr['position'] = pd.to_numeric(quali_win_corr['position'])

    # read json files
    f = open('./f1_data/country_codes.json', 'r')
    country_codes = json.load(f)
    f = open('./f1_data/drop_names.json', 'r')
    drop_names = json.load(f)

    keepNames = quali_win_corr['name'].value_counts().iloc[:40]
    for name in keepNames.keys():
        if name in drop_names:
            del keepNames[name]
    circ_features = quali_win_corr[quali_win_corr['name'].isin(keepNames.keys())].groupby(
        'name')[['grid', 'position']].corr().iloc[0::2, -1].reset_index()[['name', 'position']]
    circ_features['country_code'] = circ_features['name'].map(country_codes)
    circ_features['freq'] = circ_features['name'].map(dict(keepNames))
    circ_features = circ_features.fillna('')
    circ_features = circ_features.sort_values(
        by=['position'], inplace=True).to_dict('records')
    return jsonify(circ_history, circ_features)


'''
FOOTBALL ROUTES
'''


# Creating Data for storage
def dataunpack(basepath, datacurr):
    with urllib.request.urlopen(str(basepath + datacurr + '.csv')) as f:
        html = f.read().decode('utf-8')
    with open("./football_data/" + datacurr + '.txt', "w") as myfile:
        myfile.write(html)

    with open('./football_data/' + datacurr + '.txt', 'r') as in_file:
        stripped = (line.strip() for line in in_file)
        lines = (line.split(",") for line in stripped if line)
        with open(str('./football_data/' + datacurr + '.csv'), 'w') as out_file:
            writer = csv.writer(out_file)
            writer.writerows(lines)


def addleagueimage():
    url = "https://api-football-beta.p.rapidapi.com/leagues"
    headers = {
        "X-RapidAPI-Host": "api-football-beta.p.rapidapi.com",
        "X-RapidAPI-Key": "d78ca9f758msh31ad154b2fe50a8p12fbc9jsnabb8cabd4076"
    }
    leagues = requests.request("GET", url, headers=headers)
    return leagues


def unpack_legue_id():
    # Create dict of id: [league name, season]
    url = "https://api-football-beta.p.rapidapi.com/leagues"

    headers = {
        "X-RapidAPI-Host": "api-football-beta.p.rapidapi.com",
        "X-RapidAPI-Key": "d78ca9f758msh31ad154b2fe50a8p12fbc9jsnabb8cabd4076"
    }

    response = requests.request("GET", url, headers=headers)

    league_id_dict = {}
    leagues = response.json()['response']
    for league in leagues:
        league_id_dict[league['league']['name']] = [
            league['league']['id'], league['seasons'][-1]['year']]
    with open('./football_data/league_id.json', 'w') as f:
        json.dump(league_id_dict, f)


@app.route('/football/getfbdata', methods=['GET'])
def getfbdata():
    # Unpacking Base Data
    basepath = 'https://projects.fivethirtyeight.com/soccer-api/club/'
    datapath = ['spi_matches_latest', 'spi_global_rankings']
    for datacurr in datapath:
        dataunpack(basepath, datacurr)

    # Editing league names in both df
    # import chosen names
    f = open('./football_data/rename_dict.json', 'r')
    rename_dict = json.load(f)
    # import chosen league images
    f = open('./football_data/league_img.json', 'r')
    league_img = json.load(f)
    # import chosen team images
    f = open('./football_data/team_img.json', 'r')
    team_img = json.load(f)
    # Change global_rankings
    rankings = pd.read_csv('./football_data/spi_global_rankings.csv')
    rename_inv = {v: k for k, v in rename_dict.items()}
    rankings = rankings.replace({"league": rename_inv})
    rankings = rankings.loc[rankings['league'].isin(list(rename_dict.keys()))]
    rankings['image'] = rankings['league'].map(league_img)
    rankings['teamImage'] = rankings['name'].map(team_img)
    rankings.to_csv(
        './football_data/spi_global_rankings.csv', index=False)
    # Change matches
    matches = pd.read_csv('./football_data/spi_matches_latest.csv')
    rename_inv = {v: k for k, v in rename_dict.items()}
    matches = matches.replace({"league": rename_inv})
    matches = matches.loc[matches['league'].isin(list(rename_dict.keys()))]
    matches['image'] = matches['league'].map(league_img)
    matches['teamImage1'] = matches['team1'].map(team_img)
    matches['teamImage2'] = matches['team2'].map(team_img)
    matches.to_csv(
        './football_data/spi_matches_latest.csv', index=False)

    return 'Data Unpacked'

# Manipulating Data for frontend


@app.route('/football/getglobalrankings', methods=['GET'])
def getglobalrankings():
    global_ranks_df = pd.read_csv('./football_data/spi_global_rankings.csv')
    global_ranks_df = global_ranks_df.drop(
        global_ranks_df.index[global_ranks_df['rank'] == 'rank'])
    global_ranks_df['Change'] = pd.to_numeric(
        global_ranks_df['prev_rank']) - pd.to_numeric(global_ranks_df['rank'])
    global_ranks_df.drop(['prev_rank'], axis=1, inplace=True)
    # global_ranks_df['teamImage'] = global_ranks_df['name'].map(team_dict)
    global_ranks_df = global_ranks_df.fillna('')
    global_ranks = global_ranks_df.to_dict('records')
    return jsonify(global_ranks)


@app.route('/football/getfuturepredictions', methods=['GET'])
def getfuturepredictions():
    global_ranks_df = pd.read_csv('./football_data/spi_matches_latest.csv')
    global_ranks_df = global_ranks_df.drop(
        global_ranks_df.index[global_ranks_df['date'] == 'date'])
    global_ranks_df['date'] = pd.to_datetime(
        global_ranks_df['date'], errors='coerce')
    global_ranks_df = global_ranks_df[global_ranks_df['date']
                                      >= datetime.datetime.now() - timedelta(days=1)]
    global_ranks_df = global_ranks_df.drop_duplicates()
    global_ranks_df['probd'] = 1 - pd.to_numeric(
        global_ranks_df['prob1']) - pd.to_numeric(global_ranks_df['prob2'])
    global_ranks_df['probd'] = global_ranks_df['probd'].round(2)
    global_ranks_df = global_ranks_df.fillna('')
    global_ranks_df.sort_values('date', inplace=True)
    global_ranks_df = global_ranks_df.reset_index()
    global_ranks = global_ranks_df.to_dict('records')
    return jsonify(global_ranks)


@app.route('/football/getleaguedropdown', methods=['GET'])
def getleaguedropdown():
    matches = pd.read_csv(
        './football_data/spi_matches_latest.csv')['league'].unique()
    matches_list = list(matches)
    matches_list.insert(0, "All Leagues")
    final_list = []
    for i, item in enumerate(matches_list):
        matches_dict = {}
        matches_dict['id'] = i
        matches_dict['content'] = item
        final_list.append(matches_dict)
    return jsonify(final_list)


@app.route('/football/getleaguepredictions', methods=['GET'])
def getleaguepredictions():
    global_ranks_df = pd.read_csv('./football_data/spi_matches_latest.csv')
    global_ranks_df = global_ranks_df.drop(
        global_ranks_df.index[global_ranks_df['date'] == 'date'])
    global_ranks_df['date'] = pd.to_datetime(
        global_ranks_df['date'], errors='coerce')

    # global_ranks_df = global_ranks_df[global_ranks_df['date']
    #                                   >= datetime.datetime.now() - timedelta(days=1)]
    global_ranks_df = global_ranks_df.drop_duplicates()

    global_ranks_df['probd'] = 1 - pd.to_numeric(
        global_ranks_df['prob1']) - pd.to_numeric(global_ranks_df['prob2'])
    global_ranks_df['probd'] = global_ranks_df['probd'].round(2)
    global_ranks_df = global_ranks_df.fillna('')
    global_ranks_df.sort_values('date', inplace=True, ascending=False)
    global_ranks_df = global_ranks_df.reset_index()
    global_ranks = global_ranks_df.to_dict('records')
    return jsonify(global_ranks)


if __name__ == '__main__':
    app.run(debug=True)
