from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from mongoengine.errors import ValidationError, NotUniqueError, DoesNotExist
from mongoengine.queryset.visitor import Q
from database.models import Passwords, Words, User
import json
import random


class SavePassword(Resource):

    def get_current_user(self):
        user_id = get_jwt_identity()
        user = User.objects.get(id=user_id)
        return user

    @jwt_required
    def get(self):
        domain = request.args.get("domain")
        username = request.args.get("username")
        if domain is not None and len(domain) > 0:
            try:
                user = self.get_current_user()
                creds = Passwords.objects.filter(
                    Q(domain=domain) & Q(user=user) & Q(username=username))
                res = []
                for cred in creds:
                    res.append({
                        "domain": cred.domain,
                        "username": cred.username,
                        "password": cred.password
                    })
                return res, 200
            except DoesNotExist as dne:
                err_msg = "Given domain does not exists"
                return {"message": err_msg}, 401
            except Exception as e:
                print(e, flush=True)
                return {"message": "something went wrong try again"}, 400
        else:
            return {"message": "Domain should not be empty"}

    @jwt_required
    def post(self):
        body = request.get_json()
        if body is not None:
            try:
                user = self.get_current_user()
                creds = Passwords(**body, user=user)
                print(creds.user.id, flush=True)
                creds.validate()
                creds.save()
                return {"message": "Password saved successfully"}, 200
            except ValidationError as ve:
                err_msg = str(ve.errors.get("__all__"))
                return {"message": err_msg}, 400
            except NotUniqueError as nue:
                return {"message": "Username on this domain already Exists"}, 400
            except Exception as e:
                return {"message": "something went wrong"}, 400
        else:
            return {"message": "body should be - non empty and a valid json object"}, 400

    @jwt_required
    def put(self):
        body = request.get_json()
        if body is not None:
            try:
                user = self.get_current_user()
                creds = Passwords.objects.get(
                    Q(domain=body.get("domain")) & Q(username=body.get("username")) & Q(user=user))
                creds.username = body.get("username")
                creds.password = body.get("password")
                creds.validate()
                creds.save()

                return {"message": "Details updated successfully"}, 200
            except DoesNotExist as dne:
                err_msg = "Given domain or username does not exists"
                return {"message": err_msg}, 401
            except ValidationError as ve:
                err_msg = str(ve.errors.get("__all__"))
                return {"message": err_msg}, 420
            except Exception as e:
                print(e, flush=True)
                return {"message": "something went wrong"}, 400
        else:
            return {"message": "body should be - non empty and a valid json object"}, 400

    @jwt_required
    def delete(self):
        domain = request.args.get("domain")
        username = request.args.get("username")
        if domain is not None and username is not None:
            try:
                user = self.get_current_user()
                doc = Passwords.objects.get(
                    Q(domain=domain) & Q(username=username) & Q(user=user))
                doc.delete()
                return {"message": "Credentials deleted successfully"}, 200
            except DoesNotExist as dne:
                err_msg = "Given Username on this domain does not exists"
                return {"message": err_msg}, 401
            except Exception as e:
                return {"message": "something went wrong try again"}, 400
        else:
            return {"message": "Domain should not be empty"}


class GeneratePassword(Resource):

    def get(self):
        chars = "!@#$%^&*()_+"
        number = random.randint(0, 9)
        ch_num = random.randint(0, 11)
        try:
            words = Words.objects().aggregate([{'$sample': {'size': 2}}])
            words_arr = []
            for i in words:
                words_arr.append(i["name"])
            password = f"{words_arr[0]}{number}{chars[ch_num]}{words_arr[1]}"
        except Exception as e:
            return {"message": "Something went wrong try again"}, 500
        return {"password": password}, 200


class ListPasswords(Resource):
    def get_current_user(self):
        user_id = get_jwt_identity()
        user = User.objects.get(id=user_id)
        return user

    @jwt_required
    def get(self):
        page = request.args.get("page", 1)
        try:
            user = self.get_current_user()
            creds = Passwords.objects.filter(user=user).limit(10)
            res = []
            for cred in creds:
                res.append({
                    "domain": cred.domain,
                    "username": cred.username
                })
            return res, 200
        except Exception as e:
            print(e)
            return {"message": "something went wrong try again"}, 400


# adding all the words in db

# with open("./resources/random_words.json", "r") as f:
#             data = f.read()
#             d = json.loads(data)
#             for i in d:
#                 print(i,flush=True)
#                 word = Words(name = i)
#                 word.save()
