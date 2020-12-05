from .authenticate import Home, SignUp, Login
  
def initialise_routes(api):
    api.add_resource(Home, "/")

    api.add_resource(SignUp, "/api/auth/signup")
    api.add_resource(Login, "/api/auth/login")