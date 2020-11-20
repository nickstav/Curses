import json

def getUserData():
    with open('testPy.json', 'r') as file:
        data = json.load(file)

    return data
