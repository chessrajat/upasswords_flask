'''
/*
 * @Author: Rajat
 * @Date: 2020-12-08 13:14:22 
 * @Last Modified by: Rajat
 * @Last Modified time: 2023-03-06 12:47:12
 */
 '''

from .authenticate import Home, SignUp, Login, RefreshToken, UserProfile
from .passwords import GeneratePassword, ListPasswords, SavePassword


def initialise_routes(api):
    api.add_resource(Home, "/")

    api.add_resource(SignUp, "/api/signup")
    api.add_resource(Login, "/api/login")
    api.add_resource(UserProfile, "/api/user")
    api.add_resource(RefreshToken, "/api/refresh_auth_token")

    api.add_resource(GeneratePassword, "/api/generate")

    api.add_resource(SavePassword, "/api/password")
    api.add_resource(ListPasswords, "/api/password/list")
