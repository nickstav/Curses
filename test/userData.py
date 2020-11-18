import json

def getUserData():
    with open('test.json', 'r') as file:
        data = json.load(file)

    return data
