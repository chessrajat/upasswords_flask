from flask import request, Response
from flask_restful import Resource
from database.models import User

class Home(Resource):
    def get(self):
        return "welcome to the u_passwords api"

class SignUp(Resource):
    def post(self):
        body = request.get_json()
        if body is not None:
            user = User(**body)
            user.hash_password()
            user.save()
            return {"uid": user}, 200


