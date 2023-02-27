from enum import unique
from mongoengine import StringField, EmailField, Document, ReferenceField
from mongoengine.errors import ValidationError
from flask_bcrypt import generate_password_hash, check_password_hash

class User(Document):
    name = StringField()
    email = EmailField(required=True, unique = True)
    password = StringField(required=True,min_length=6)
    
    def hash_password(self):
        self.password = generate_password_hash(self.password).decode("utf8")

    def check_password(self, password):
        return check_password_hash(self.password, password)

class Passwords(Document):
    # for using unique_with -> you have to specify at the time of creation of collection
    # if we change this parameter , drop the collection and start again
    user = ReferenceField("User")
    domain = StringField(required=True)
    username = StringField(required=True)
    password = StringField(required=True)
    meta = {
        'indexes': [
            {'fields': ('domain', 'username'), 'unique': True}
        ]
    }

    def clean(self):
        if "/" in self.domain:
            msg = "Domain should be in format 'example.com'"
            raise ValidationError(msg)
        if len(self.username) < 1:
            msg = "Username should not be empty"
            raise ValidationError(msg)

    

class Words(Document):
    name = StringField(required=True)