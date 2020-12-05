from .authenticate import Home, SignUp
  
def initialise_routes(api):
    api.add_resource(Home, "/")

    api.add_resource(SignUp, "/api/auth/signup")