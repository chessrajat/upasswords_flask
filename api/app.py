from flask import Flask, request, Response
from flask_restful import Api, Resource
from flask_bcrypt import Bcrypt
from database.db import initialise_db
from resources.routes import initialise_routes

app = Flask(__name__)

initialise_db()

# using flask_restful for routes
api = Api(app)
initialise_routes(api)

bcrypt = Bcrypt(app)



    


if __name__ == "__main__":
    app.run(port=5000, use_reloader=True, host="0.0.0.0")

