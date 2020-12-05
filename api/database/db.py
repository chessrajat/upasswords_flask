from mongoengine import connect 

def initialise_db():
    connect("upasswords", "db", port=27017)