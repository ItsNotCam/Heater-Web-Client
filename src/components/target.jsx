import CircularSlider from "@fseehawer/react-circular-slider";
import React from "react";

import SyncLoader from "react-spinners/SyncLoader";

export default class Target extends React.Component {
  super(props) {
    this.props = props;
    this.setState({
      target: props.target,
    });
  }

  componentDidMount = () => {
    this.setState({ target: this.props.target });

    const msg = JSON.stringify({ action: "receive" });
    setInterval(() => {
      this.props.websock.send(msg);
    }, 2000);

    this.props.websock.onmessage = (event) => {
      const { target } = JSON.parse(event.data);
      this.setState({
        target: target,
      });
    };
  };

  updateTarget = (value) => {
    console.log(value);
  };

  render() {
    return this.state == null ? (
      <SyncLoader color={"#3e98c7"} />
    ) : (
      <div style={{ marginTop: "30vh" }}>
        <CircularSlider
          width={150}
          label="Target"
          valueFontSize={"2rem"}
          verticalOffset={"0.5rem"}
          dataIndex={this.state.target - 65}
          onChange={(value) => this.updateTarget(value)}
          min={65}
          max={88}
          trackSize={12}
          progressSize={12}
          knobColor="#b931b0"
          appendToValue="°"
        />
      </div>
    );
  }
}
