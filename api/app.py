from flask import Flask, request, Response
from flask_restful import Api, Resource
from flask_bcrypt import Bcrypt
from database.db import initialise_db
from resources.routes import initialise_routes
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config.from_envvar('ENV_FILE_LOCATION')
app.config['PROPAGATE_EXCEPTIONS'] = True

initialise_db()

# using flask_restful for routes
api = Api(app)
initialise_routes(api)

bcrypt = Bcrypt(app)

# initialising JWT here
jwt = JWTManager(app)



# handling jwt errors
@jwt.unauthorized_loader
def without_jwt_token(msg):
    return {"message":msg}
    


    


if __name__ == "__main__":
    app.run(port=5000, use_reloader=True, host="0.0.0.0")

