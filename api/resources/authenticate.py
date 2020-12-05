from flask import request, Response
from flask_restful import Resource
from database.models import User
from mongoengine.errors import NotUniqueError, ValidationError, FieldDoesNotExist

class Home(Resource):
    def get(self):
        return "welcome to the u_passwords api"

class SignUp(Resource):
    def post(self):
        body = request.get_json()
        if body is not None:
            try:
                user = User(**body)
                user.validate()
                user.hash_password()
                user.save()
            except NotUniqueError as nue:
                return {"message": "Email alreay Exists"}, 419
            except ValidationError as ve:
                return {"message": str(ve.errors)}, 420
            except FieldDoesNotExist as fdne:
                return {"message": fdne.args[0]}, 418
               
            return {"message":"Signup Successful"}, 200
        else:
            return {"message": "body should be non empty, valid json object"}, 422


