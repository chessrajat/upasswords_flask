from flask_restful import Resource
from database.models import Passwords, Words
import json
import random

class SavePassword(Resource):

    def post(self):
        pass


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