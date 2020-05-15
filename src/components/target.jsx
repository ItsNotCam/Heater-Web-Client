import React from "react";

import { TextField } from "@material-ui/core";
import { SyncLoader } from "react-spinners";

import UpdateButton from "./updateButton";

export default class Target extends React.Component {
  super(props) {
    this.props = props;
    this.state = {
      target: props.target,
    };
  }

  componentDidMount = () => {
    this.setState({
      target: this.props.target,
    });
  };

  updateTarget = (callback) => {
    console.log("updating");
    this.props.updateTarget(this.state.target, callback);
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
            onChange={(e) => this.setState({ target: e.target.value })}
            style={{ top: -5, width: "60%" }}
          />
          <UpdateButton
            updateTarget={(callback) => this.updateTarget(callback)}
          />
        </div>
      </>
    );
  }
}
