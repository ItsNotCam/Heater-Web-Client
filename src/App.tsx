import React from "react";
import { CircularProgress, Container, Grid } from "@mui/material";

import Temperature from "./components/temperature";
import { TemperatureSocket } from "./TemperatureSocket";

export interface IAppState {
  temperatureJSON: ITemperatureJSON;
  loaded?: boolean;
}

export interface ITemperatureJSON {
  temperature: number;
  target: number;
  on: boolean;
}

class App extends React.Component<{}, IAppState> {
  temperatureSocket: TemperatureSocket;

  constructor(props: {}) {
    super(props);
    this.state = {
      temperatureJSON: {
        temperature: 0,
        target: 0,
        on: false
      },
      loaded: false,
    };

    this.temperatureSocket = new TemperatureSocket({
      updateStateCallback: this.updateTemperatureState,
      setLoadedCallback: this.setLoaded
    });
  }

  componentDidMount(): void {
    this.temperatureSocket.connect();
  }

  setLoaded = (loaded: boolean): void => {
    this.setState({loaded: loaded});
  }

  updateTemperatureState = (newState: ITemperatureJSON): void => {
    this.setState({ 
      temperatureJSON: {
        temperature: newState.temperature,
        target: newState.target,
        on: newState.on
      }
    })
  }

  render() {
    const centeredDiv: any = {
      margin: 0,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
    };

    return (
      <Grid container spacing={2} alignContent="center" justifyContent="center" style={centeredDiv}>
        {this.state.loaded ? (
          <div className="fade-in"> 
            <Temperature {...this.state.temperatureJSON} /> 
          </div>
        ) : (
          <CircularProgress />
        )}
      </Grid>
    );
  }
}

export default App;
