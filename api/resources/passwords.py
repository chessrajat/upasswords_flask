from flask import request
from flask_restful import Resource
from mongoengine.errors import ValidationError, NotUniqueError, DoesNotExist
from database.models import Passwords, Words
import json
import random
 
class SavePassword(Resource):

    def get(self):
        domain = request.args.get("domain")
        if domain is not None and len(domain)>0:
            try:
                creds = Passwords.objects.get(domain=domain)
                res = {
                    "domain":creds.domain,
                    "username":creds.username,
                    "password":creds.password
                }
                return res,200
            except DoesNotExist as dne:
                err_msg = "Given domain does not exists"
                return {"message": err_msg}, 401
            except Exception as e:
                return {"message":"something went wrong try again"}, 400
        else:
            return {"message": "Domain should not be empty"}

    def post(self):
        body = request.get_json()
        if body is not None:
            try:
                creds = Passwords(**body)
                creds.validate()
                creds.save()
                return {"message": "Password saved successfully"}, 200
            except ValidationError as ve:
                err_msg = str(ve.errors.get("__all__"))
                return {"message": err_msg}, 420
            except NotUniqueError as nue:
                return {"message": "Domain already Exists"}, 419
            except Exception as e:
                return {"message": "something went wrong"}, 400
        else:
            return {"message": "body should be - non empty and a valid json object"}, 422

    def put(self):
        body = request.get_json()
        if body is not None:
            try:
                creds = Passwords.objects.get(domain=body.get("domain"))
                if "username" or "password" not in body:
                    return {"message":"Username or Password not specified for update"}
                creds.username = body.get("username")
                creds.password = body.get("password")
                creds.validate()
                creds.save()

                return {"message": "Details updated successfully"}, 200
            except DoesNotExist as dne:
                err_msg = "Given domain does not exists"
                return {"message": err_msg}, 401 
            except ValidationError as ve:
                err_msg = str(ve.errors.get("__all__"))
                return {"message": err_msg}, 420
            except Exception as e:
                return {"message": "something went wrong"}, 400
        else:
            return {"message": "body should be - non empty and a valid json object"}, 422

    def delete(self):
        domain = request.args.get("domain")
        if domain is not None and len(domain)>0:
            try:
                doc = Passwords.objects.get(domain=domain)
                doc.delete()
                return {"message":"Credentials deleted successfully"},200
            except DoesNotExist as dne:
                err_msg = "Given domain does not exists"
                return {"message": err_msg}, 401
            except Exception as e:
                return {"message":"something went wrong try again"}, 400
        else:
            return {"message": "Domain should not be empty"}


class GeneratePassword(Resource):

    def get(self):
        chars = "!@#$%^&*()_+"
        number = random.randint(0,9)
        ch_num = random.randint(0,11)
        try:
            words = Words.objects().aggregate([{ '$sample': { 'size': 2 } }])
            words_arr = []
            for i in words:
                words_arr.append(i["name"])
            password = f"{words_arr[0]}{number}{chars[ch_num]}{words_arr[1]}"
        except Exception as e:
            return {"message": "Something went wrong try again"}, 500
        return {"password":password}, 200




# adding all the words in db

# with open("./resources/random_words.json", "r") as f:
#             data = f.read()
#             d = json.loads(data)
#             for i in d: 
#                 print(i,flush=True)
#                 word = Words(name = i)
#                 word.save()