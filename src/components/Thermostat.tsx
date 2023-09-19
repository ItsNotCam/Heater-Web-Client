import '@fontsource/roboto/300.css';
import './Temperature.css';

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ITemperatureJSON } from "../App";
import React from 'react';
import { TemperatureSocket } from '../TemperatureSocket';
import { Button, Grid, IconButton, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RefreshIcon from '@mui/icons-material/Refresh';

export interface IThermostatProps {
  temperature: ITemperatureJSON;
  ws: TemperatureSocket;
}

export interface IThermostatState {
  isEditingTargetTemperature: boolean;
  editedTemperature: number;
}

export class Thermostat extends React.Component<IThermostatProps, IThermostatState>{
  constructor(props: IThermostatProps) {
    super(props);
    this.state = { 
      isEditingTargetTemperature: false,
      editedTemperature: props.temperature.target
    }
  }

  setEditing = (editing: boolean): void => {
    this.setState({isEditingTargetTemperature: editing})
  }
  
  applyEditedTemperature = (): void => {
    this.props.ws.changeTemperatureTarget(this.state.editedTemperature)
    this.setState({
      isEditingTargetTemperature: false
    });
  }

  updateEditedTemperature = (event: any): void => {
    this.setState({
      editedTemperature: parseInt(event.target.value),
    })
  }

  resetEditedTemperature = (): void => {
    this.setState({
      isEditingTargetTemperature: false,
      editedTemperature: this.props.temperature.target
    })
  }

  temperatureComponent = (): JSX.Element => {
    const { target } = this.props.temperature;

    const temperatureStyle: React.CSSProperties = {
      fontSize: 60
    }


    if(!this.state.isEditingTargetTemperature) {
      return (
        <span style={temperatureStyle} className='temperature' onClick={() => this.setEditing(true)}>
          {target}
        </span>
      )
    }

    const gridStyle: React.CSSProperties = {
      marginTop: 10,
      marginBottom: -15,
      alignContent: "center",
      justifyContent: "center"
    }

    return (
      <Grid container style={gridStyle}>
        <Grid item xs={12}>
          <TextField 
            type='number' 
            value={this.state.editedTemperature} 
            onChange={this.updateEditedTemperature} 
            variant="standard" 
            size="small"
            label="Change target temperature"
            style={{ paddingBottom: 10, marginTop: 10 }}
            />
        </Grid>

        <Grid item xs={2}>
          <IconButton onClick={this.resetEditedTemperature}>
            <RefreshIcon color="secondary"/>
          </IconButton>
        </Grid>

        <Grid item xs={2}>
          <IconButton onClick={this.applyEditedTemperature}>
            <CheckCircleIcon color="primary"/>
          </IconButton>
        </Grid>
      </Grid>
    )
  }

  render() {
    const { temperature } = this.props.temperature;

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

    const tempComponent: JSX.Element = this.temperatureComponent();

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
          <span style={{fontSize: 25}}>Heat set to</span>
          <br />
            {tempComponent}
          <br />
          <span>Indoor {temperature}°</span>
        </div>
      </>
    );
  }
}
