from mongoengine import connect 

def initialise_db():
    connect("upasswords",host="mongodb://db:27017/upasswords")