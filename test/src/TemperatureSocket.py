import json, random

STATE_PATH = "state.json"

class TemperatureSocket:
    def __init__(self):
        self.loadState()

    def saveState(self):
        with open(STATE_PATH,'w') as file:
            file.writelines(json.dumps(self.data))

    def loadState(self):
        with open(STATE_PATH,'r') as file:
            self.data = json.loads(file.read())

    def getTemperature():
        return random.randint(72, 88)