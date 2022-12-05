from rest_framework.response import Response
from rest_framework.decorators import api_view

#/ GLOBAL AUTÓMATA:
from src.caja import Caja
safebox = Caja("LRLR")

@api_view(["GET"])
def getData(request):
    greet = {"Hola, mundo!"}
    return Response(greet)

@api_view(["GET"])
def resetAutomata(request):
    password = request.query_params.get("password")
    try:
        safebox.setPassword(str(password))
        okay = True
    except:
        okay = False
    
    reset = {"okay": okay}
    return Response(reset)

@api_view(["GET"])
def moveAutomata(request):
    direction = str(request.query_params.get("direction")).upper()
    try:
        doesItOpen = safebox.move(direction)
        response = {"open": doesItOpen}
    except:
        response = {"error": "Algo fracasó :("}
    return Response(response)