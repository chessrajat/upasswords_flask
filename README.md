# Python Flask API for password manager
- Allows user to signup and login
- Allows to generate password, with real passphrases
- save passwords with domain names and retreive them and update them
- Using mongodb connection to store passwords and users

## Setup
**prerequisite**
- Docker , docker-compose
- Docker images - mongodb, python:3.7

Clone this repo -> ```git clone https://github.com/chessrajat/upasswords_flask.git```<br>
create ```secret.env``` file in ```/api``` directory with content<br>
```JWT_SECRET_KEY = "Your_secret_key_here"```
- This is for jwt configuration

Now just, run 
- ```docker-compose build```
- ```docker-compose up```

**Note** 
*Before generating passwords restore the words database backup in mongodb image.*
- *Run the containers by*
- *Open cli of the mongodb container*
- *Run this command ```mongorestore --db upasswords /app/backup/upasswords```*



## USAGE
### Signup
- End Point -> /api/signup [POST]
- Takes input as json object with keys -> name, email, password
- Example
- ```
    "name":"john",
    "email":"example@example.com",
    "password":"somepa55word"
### Login
- End Point -> /api/login [POST]
- Input Json Example
- ```"email":"example@example.com",
  "password":"somepa55word"```

### Generate password
- End Point -> /api/generate [GET]
- takes no input

### Passwords operation - save,retreive,update, delete
- End Point -> /api/password [GET] [POST] [PUT] [DELETE]
- All these method needs the JWT auth token that you get after login
**NOTE** - * If you are using postman in authorisation section put the token in bearer token**
- **Save** - [POST]
    - Input as json , Example
    - ```"domain":"example.com",
        "username":"example@example.com",
        "password":"somepa55word"```
- **Retreive** - [GET]
    - Input in parameter
    - /api/password?domain="example.com"
- **Update** - [PUT]
    - Input same as save
- **Delete** - [DELETE]
    - Input same as Retreive
    - /api/password?domain="example.com"
