import '@fontsource/roboto/300.css';
import './Temperature.css';

import "react-circular-progressbar/dist/styles.css";
import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RefreshIcon from '@mui/icons-material/Refresh';

import { CircularProgressbar } from "react-circular-progressbar";
import { Grid, IconButton, TextField, CircularProgress } from '@mui/material';
import { ITemperatureJSON } from "../App";
import { CircularProgressbarStyles } from 'react-circular-progressbar/dist/types';
import { TemperatureSocket } from '../TemperatureSocket';

export interface IThermostatProps {
  temperature: ITemperatureJSON;
  ws: TemperatureSocket;
}

enum TargetTemperatureState {
  DISPLAY, EDITING, UPDATING
}

export interface IThermostatState {
  targetTemperatureState: TargetTemperatureState;
  editedTemperature: number;
}

export class Thermostat extends React.Component<IThermostatProps, IThermostatState>{
  constructor(props: IThermostatProps) {
    super(props);
    this.state = { 
      targetTemperatureState: TargetTemperatureState.DISPLAY,
      editedTemperature: props.temperature.target,
    }
  }

  setTargetTempState = (newState: TargetTemperatureState): void => {
    this.setState({ targetTemperatureState: newState })
  }
  
  applyEditedTemperature = (): void => {
    this.props.ws.changeTemperatureTarget(this.state.editedTemperature);
    this.setTargetTempState(TargetTemperatureState.UPDATING);
    setTimeout(() => {
      this.setTargetTempState(TargetTemperatureState.DISPLAY);
    }, 500);
  }

  updateEditedTemperature = (event: any): void => {
    this.setState({
      editedTemperature: parseInt(event.target.value),
    })
  }

  resetEditedTemperature = (): void => {
    this.setState({
      targetTemperatureState: TargetTemperatureState.DISPLAY,
      editedTemperature: this.props.temperature.target
    })
  }

  renderTemperatureTargetComponent = (): JSX.Element => {
    switch(this.state.targetTemperatureState) {
      case TargetTemperatureState.DISPLAY:
        return this.renderDisplayingTarget();
      case TargetTemperatureState.EDITING:
        return this.renderEditingTarget();
      case TargetTemperatureState.UPDATING:
        return this.renderUpdatingTarget();
    }
  }

  renderUpdatingTarget = (): JSX.Element => {
    return (
      <div style={{paddingTop: 48, paddingBottom: 20}}>
        <CircularProgress size={50} />
      </div>
    )
  }

  renderDisplayingTarget = (): JSX.Element => {
    const { target } = this.props.temperature;
    const temperatureStyle: React.CSSProperties = {
      fontSize: 120
    }

    return (
      <span style={temperatureStyle} className='temperature' 
        onClick={() => this.setTargetTempState(TargetTemperatureState.EDITING)}>
        {target}
      </span>
    )
  }

  renderEditingTarget = (): JSX.Element => {
    const gridStyle: React.CSSProperties = {
      marginTop: 10,
      marginBottom: -15,
      alignContent: "center",
      justifyContent: "center",
    }

    return (
      <Grid container style={gridStyle}>
        <Grid item xs={12}>
          <TextField 
            type='number' 
            value={this.state.editedTemperature} 
            onChange={this.updateEditedTemperature} 
            variant="standard" 
            label="Change Target Temperature"
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

    var progressBarStyle: CircularProgressbarStyles = {
      root: {
        height: "30rem",
        width: "30rem"
      },
      path: { 
        stroke: "rgba(35,35,35,1)",
        backgroundBlendMode: 'multiply'
      },
      background: {
        fill: 'rgba(20,20,20,0.6)',
      },
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

    return (
      <>
        <CircularProgressbar
          value={temperature}
          minValue={60}
          maxValue={90}
          styles={progressBarStyle}
          strokeWidth={5}
          background={true}
        />
        <div style={divStyle}>
          <span style={{fontSize: 25, userSelect:"none" }}>Heat set to</span>
          <br />
            {this.renderTemperatureTargetComponent()}
          <br />
          <span style={{fontSize: 25, userSelect:"none" }}>Indoor {temperature}°</span>
        </div>
      </>
    );
  }
}
