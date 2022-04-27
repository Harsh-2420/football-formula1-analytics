from re import M
from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
db = SQLAlchemy(app)
CORS(app)


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)

    def __str__(self):
        return f'{self.id} {self.content}'


def todo_serializer(todo):
    return {'id': todo.id,
            'content': todo.content}


@app.route('/api', methods=['GET'])
def index():
    return jsonify([*map(todo_serializer, Todo.query.all())])


@app.route('/api/yearselect', methods=['POST'])
def yearselect():
    if request.method == 'POST':
        request_data = request.get_json(force=True)
        todo = Todo(content=request_data['content'])
        db.session.add(todo)
        db.session.commit()
        return {"201": request_data['content']}


@app.route('/api/create', methods=["POST"])
def create():
    if request.method == 'POST':
        request_data = request.get_json(force=True)
        todo = Todo(content=request_data['content'])
        db.session.add(todo)
        db.session.commit()
        return {'201': 'Todo Added'}


@app.route('/api/<int:id>', methods=['GET'])
def delete(id):
    response = {}
    todo = Todo.query.get(id)
    response['id'] = todo.id
    db.session.delete(todo)
    db.session.commit()
    return {'204': 'Todo Deleted'}


if __name__ == '__main__':
    app.run(debug=True)
