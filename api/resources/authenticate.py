from flask import request, Response
from flask_restful import Resource
from flask_jwt_extended import create_access_token
from database.models import User
from mongoengine.errors import NotUniqueError, ValidationError, FieldDoesNotExist, DoesNotExist
import datetime


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
            except Exception as e:
                return {"message": "something went wrong"}, 400
               
            return {"message":"Signup Successful"}, 200
        else:
            return {"message": "body should be non empty, valid json object"}, 422


class Login(Resource):

    def post(self):
        body = request.get_json()
        if body is not None:
            if "email" in body and "password" in body:
                try:
                    user = User.objects.get(email=body.get("email"))
                    authorized = user.check_password(body.get('password'))
                    if not authorized:
                        return {'message': 'Email or password invalid'}, 401

                    expires = datetime.timedelta(days=7)
                    access_token = create_access_token(identity=str(user.id), expires_delta=expires)
                    return {'token': access_token}, 200
                except DoesNotExist as dne:
                    return {"message": "Email or password invalid"},401
                except Exception as e:
                    return {"message": "Something went wrong"}, 400
            else:
                return {"message": "should have 'email' and 'password' as key"},423
        else:
            return {"message": "body should be non empty, valid json object"}, 422
