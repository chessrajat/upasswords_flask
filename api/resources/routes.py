'''
/*
 * @Author: Rajat
 * @Date: 2020-12-08 13:14:22 
 * @Last Modified by: Drag0
 * @Last Modified time: 2020-12-08 13:16:55
 */
 '''

from .authenticate import Home, SignUp, Login
from .passwords import GeneratePassword, SavePassword
  
def initialise_routes(api):
    api.add_resource(Home, "/")

    api.add_resource(SignUp, "/api/signup")
    api.add_resource(Login, "/api/login")
    
    api.add_resource(GeneratePassword, "/api/generate")
    
    api.add_resource(SavePassword, "/api/password")