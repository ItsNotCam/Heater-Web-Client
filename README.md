# HeaterPi

![Demo](https://i.imgur.com/aF9fCVu.gif)

## Overview

HeaterPi is a full-stack web application that allows users to remotely control and monitor the temperature in a room using a Raspberry Pi. This application is built using Python, TypeScript, ReactJS, Node.js, asynchronous Websockets, and REST requests.


## Features

- **Temperature Sensing**: The Raspberry Pi collects real-time temperature data in the room to provide accurate information on the current temperature.

- **Remote Control**: Users can set a target temperature through a user-friendly web interface accessible from any device with a browser, and the application will autonomously maintain that room temperature in the real world.

- **WebSocket Communication**: Real-time communication between the web UI and the Raspberry Pi is achieved through WebSockets, ensuring seamless updates and responsiveness.

## Tech Stack

- **Python**: The Raspberry Pi communicates with the temperature sensor, listens on the web socket, and controls the Philips Hue Smart Plug using Python.

- **ReactJS and TypeScript**: The frontend of the application is developed using ReactJS and Typescript

- **Asynchronous Websockets**: Asynchronous WebSockets ensure efficient real-time communication between the frontend and the Raspberry Pi.

## What I Learned
Throughout work on this project I broadened my understanding of ReactJS, Typescript, and WebSockets. Additionally, I gained hands-on experience in leveraging Raspberry Pi for IoT applications, enabling interactive real-world interactions with physical devices.
