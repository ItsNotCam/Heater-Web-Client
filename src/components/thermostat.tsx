import '@fontsource/roboto/300.css';
import './temperature.css';

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ITemperatureJSON } from "../App";
import React from 'react';
import { TemperatureSocket } from '../TemperatureSocket';

export interface IThermostatProps {
  temperature: ITemperatureJSON;
  ws: TemperatureSocket;
}

export interface IThermostatState {
  isEditingTargetTemperature: boolean;
}

export class Thermostat extends React.Component<IThermostatProps, IThermostatState>{
  constructor(props: IThermostatProps) {
    super(props);
    this.state = { 
      isEditingTargetTemperature: false
    }
  }

  setEditing = (editing: boolean): void => {
    this.setState({isEditingTargetTemperature: editing})
  }

  render() {
    const { temperature, target, on } = this.props.temperature;


    var progressBarStyle = {
      path: { stroke: "rgba(5,153,194,100)" }
    };

    const divStyle: React.CSSProperties = {
      margin: 0,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      alignContent: "center",
      justifyContent: "center",
      textAlign: 'center',
    };

    const temperatureStyle: React.CSSProperties = {
      fontSize: 60
    }

    return (
      <>
        <CircularProgressbar
          value={temperature}
          minValue={60}
          maxValue={90}
          styles={progressBarStyle}
          strokeWidth={5}
        />
        <div style={divStyle}>
          <span style={{fontSize: 25}}>Heat set to</span><br />
          <span style={temperatureStyle} className='temperature' onClick={() => this.setEditing(true)}>
              {this.props.temperature.target}
          </span>
          <br></br>
          <span>Indoor {temperature}°</span>
        </div>
      </>
    );
  }
}
