import asyncio, time, json, random
from websockets.server import serve

dummyData = {
    "temperature": 75,
    "target": 84,
    "on": True
}

async def echo(websocket):
    while True:
        for message in websocket.messages:
            print(message)

        time.sleep(1)

        dummyData["temperature"] = random.randint(72, 88)

        dataJSON = json.dumps(dummyData)
        print(dataJSON)

        await websocket.send(dataJSON)

async def main():
    async with serve(echo, "localhost", 3005):
        await asyncio.Future()


asyncio.run(main())