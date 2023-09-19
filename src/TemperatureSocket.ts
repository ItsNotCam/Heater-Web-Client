import { ITemperatureJSON } from "./App";

export interface ITemperatureSocketCallbacks {
    updateTemperatureStateCallback: (newState: ITemperatureJSON) => void;
    setLoadedCallback: (loaded: boolean) => void;
}

export class TemperatureSocket {
    ws?: WebSocket;
    updateTemperatureStateCallback: (newState: ITemperatureJSON) => void;
    setLoadedCallback: (loaded: boolean) => void;

    constructor(callbacks: ITemperatureSocketCallbacks) {
        this.updateTemperatureStateCallback = callbacks.updateTemperatureStateCallback
        this.setLoadedCallback = callbacks.setLoadedCallback;
    }
    
    connect = async () => {
        this.ws = new WebSocket("ws://localhost:3005");
        this.ws.onopen = this.onOpenSocket;
        this.ws.onmessage = this.onMessageSocket;
    }

    changeTemperatureTarget = async (newTemperature: number): Promise<boolean> => {
        let success: boolean = false;
        if(this.ws?.OPEN) {
            try {
                this.ws.send(JSON.stringify({
                    target: newTemperature,
                }))
                success = true;
            } catch(err) { }
        }

        return new Promise<boolean>((resolve, reject) => {
            success ? resolve(true) : reject(false);
        })
    }

    onMessageSocket = async (e: any | null) => {
        const data: ITemperatureJSON = JSON.parse(e.data);
        const { temperature, target, on } = data;

        console.log(`temperature = ${temperature}\ntarget = ${target}\non = ${on}`);
        this.updateTemperatureStateCallback({
            temperature: temperature,
            target: target,
            on: on
        });
    }

    onOpenSocket = (e: any | null) => {
        console.log("Websocket connected");
        this.setLoadedCallback(true);
    }

    onCloseSocket = (e: any | null) => {
        console.log("Websocket disconnected");
        this.setLoadedCallback(false);
    }
}