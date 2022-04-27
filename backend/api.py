from re import M
from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

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


def serializer(todo):
    return {'id': todo.id,
            'content': todo.content}


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
        request_data = request.get_json(force=True)
        db.session.add(Race(content='Australia'))
        db.session.commit()
        app.logger.info(str("#######################" + request_data))
        return {"201": request_data}


@app.route('/api/selectrace', methods=['POST'])
def selectrace():
    if request.method == 'POST':
        request_data = request.get_json(force=True)
        # db.session.add(Race(content='Singapore'))
        # db.session.commit()
        app.logger.info(str("#######################" + request_data))
        return {"201": request_data}


@app.route('/api/selectevent', methods=['POST'])
def selectevent():
    if request.method == 'POST':
        request_data = request.get_json(force=True)
        # db.session.add(Event(content=request_data))
        # db.session.commit()
        return {"201": request_data}


# @app.route('/api/create', methods=["POST"])
# def create():
#     if request.method == 'POST':
#         request_data = request.get_json(force=True)
#         todo = Todo(content=request_data['content'])
#         db.session.add(todo)
#         db.session.commit()
#         return {'201': 'Todo Added'}


# @app.route('/api/<int:id>', methods=['GET'])
# def delete(id):
#     response = {}
#     todo = Todo.query.get(id)
#     response['id'] = todo.id
#     db.session.delete(todo)
#     db.session.commit()
#     return {'204': 'Todo Deleted'}


if __name__ == '__main__':
    app.run(debug=True)
