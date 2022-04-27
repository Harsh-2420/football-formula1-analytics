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
        return f'{self.id} {self.content}'


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)

    def __str__(self):
        return f'{self.id} {self.content}'


def serializer(todo):
    return {'id': todo.id,
            'content': todo.content}


@app.route('/api', methods=['GET'])
def index():
    return jsonify([*map(serializer, Todo.query.all())])


@app.route('/api/yearselect', methods=['POST'])
def yearselect():
    if request.method == 'POST':
        request_data = request.get_json(force=True)
        # todo = Todo(content=request_data['content'])
        # db.session.add(todo)
        # db.session.commit()
        app.logger.info(request_data)
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
