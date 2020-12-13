# Python Flask API for password manager
- Allows user to signup and login
- Allows to generate password, with real passphrases
- save passwords with domain names and retreive them and update them
- Using mongodb connection to store passwords and users

## Setup



## USAGE
### Signup
- End Point -> /api/signup [POST]
- Takes input as json object with keys -> name, email, password
- Example
- ```
    "name":"john",
    "email":"example@example.com",
    "password":"somepa55word"
