import React from "react";

import { TextField } from "@mui/material";
import { SyncLoader } from "react-spinners";


export interface ITemperatureProps {
  target: number;
  changeTemperatureTarget: (newTemperature: number) => void;
}

export interface ITemperatureState {
  target: number;
}

export default class Temperature extends React.Component<ITemperatureProps, ITemperatureState> {
  super(props: ITemperatureProps) {
    this.state = {
      target: props.target,
    };
  }
  
  updateTarget = () => {
    this.props.changeTemperatureTarget(this.state.target);
  };

  render() {
    return this.state == null ? (
      <SyncLoader />
    ) : (
      <>
        <div style={{ marginTop: "25%", marginBottom: "25%" }}>
          <TextField
            label="Target"
            type="number"
            value={this.state.target}
            onChange={(e) => this.setState({ target: parseInt(e.target.value) })}
            style={{ top: -5, width: "60%" }}
          />
        </div>
      </>
    );
  }
}
