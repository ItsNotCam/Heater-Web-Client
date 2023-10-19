import { ITemperatureJSON } from "./App";

export interface ITemperatureSocketCallbacks {
    updateTemperatureStateCallback: (newState: ITemperatureJSON) => void;
    setLoadedCallback: (loaded: boolean) => void;
}

export interface ISocketAction {
    action: string;
    newTemperature?: number;
}


const IP_ADDR: string = "ws://heaterpi:3005";


export class TemperatureSocket {
    ws?: WebSocket;
    updateTemperatureStateCallback: (newState: ITemperatureJSON) => void;
    setLoadedCallback: (loaded: boolean) => void;

    constructor(callbacks: ITemperatureSocketCallbacks) {
        this.updateTemperatureStateCallback = callbacks.updateTemperatureStateCallback
        this.setLoadedCallback = callbacks.setLoadedCallback;
    }

    connect = async () => {
        this.ws = new WebSocket(IP_ADDR);
        this.ws.onopen = this.onOpenSocket;
        this.ws.onmessage = this.onMessageSocket;
    }

    getTemperatureLoop = async (): Promise<void> => {
        this.ws?.send(JSON.stringify({ 
            action: "GET" 
        }))

        setInterval(() => {
            this.ws?.send(JSON.stringify({ 
                action: "GET" 
            }))
        }, 10 * 1000)
    }

    changeTemperatureTarget = async (newTemperature: number): Promise<void> => {
        this.ws?.send(JSON.stringify({
            action: "POST",
            target: newTemperature
        }));
    }

    onMessageSocket = async (e: any | null) => {
        const data: ITemperatureJSON = JSON.parse(e.data);
        const { temperature, target, on } = data;

        console.log(`temperature = ${temperature}\ntarget = ${target}\non = ${on}`);
        this.updateTemperatureStateCallback({
            action: "GET",
            temperature: temperature,
            target: target,
            on: on
        });
    }

    onOpenSocket = (e: any | null) => {
        console.log("Websocket connected");
        this.setLoadedCallback(true);
        this.getTemperatureLoop();
    }

    onCloseSocket = (e: any | null) => {
        console.log("Websocket disconnected");
        this.setLoadedCallback(false);
    }
}