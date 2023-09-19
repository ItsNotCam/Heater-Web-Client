# dependencies
import asyncio, time, json
import random
from websockets.server import serve

# heater server class
from TemperatureSocket import TemperatureSocket

async def handleConnection(websocket):
    tempSocket = TemperatureSocket()
    #recvTemperatureData(websocket, tempSocket)
    await sendTemperatureData(websocket, tempSocket)

async def sendTemperatureData(websocket, tempSocket):
    while True:
        tempSocket.data["temperature"] = random.randint(65, 85)
        dataJSON = json.dumps(tempSocket.data)
        print(dataJSON)
        await websocket.send(dataJSON)
        time.sleep(1)

async def recvTemperatureData(websocket, tempSocket):
    while True:
        data = await websocket.recv()
        tempSocket["data"] = data
        tempSocket.saveState()

async def main():
    async with serve(handleConnection, "localhost", 3005):
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())