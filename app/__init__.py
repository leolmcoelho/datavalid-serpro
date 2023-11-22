
from flask import Flask
from app.routes import api_blueprint
# from app import api_route

app = Flask(__name__)
app.register_blueprint(api_blueprint)

app.config['STATIC_FOLDER'] = 'static'
