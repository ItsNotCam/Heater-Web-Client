import React from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { Container, Grid, TextField } from "@material-ui/core";

import Temperature from "./components/temperature";

const classes = {
  margin: 0,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
};

class App extends React.Component {
  super(props) {
    this.props = props;
    this.state = {
      target: null,
      temperature: null,
      deadzone: null,
      on: true,
    };
    this.ws = null
  }

  componentDidMount() {
    this.ws = new WebSocket("ws://192.168.50.184:3005");

    const msg = JSON.stringify({ action: "receive" });
    this.ws.onopen = () => {
      console.log("websocket connected");
      this.ws.send(msg);
    };

    this.ws.onmessage = (event) => {
      console.log(event);
      const { temperature, target, deadzone, on } = JSON.parse(event.data);
      console.log(
        `temp = ${temperature}\ntarget = ${target}\ndeadzone = ${deadzone}\non = ${on}`
      );

      this.setState({
        temperature: parseInt(temperature),
        target: parseInt(target),
        deadzone: parseInt(deadzone),
        on: parseInt(on),
      });
    };

    this.ws.onclose = () => {
      console.log("disconnected")
      this.ws = new WebSocket("ws://192.168.50.184:3005");
    }

    setInterval(() => {
      if (this.ws != null) {
        const update_msg = JSON.stringify({
          action: "update",
          target: this.state.target,
        })
        
        this.ws.send(update_msg);
        console.log(msg);
        this.ws.send(msg);

      }
    }, 5000);
  }

  updateTarget = (e) => {
    console.log(e.target.value)
    this.setState({target: e.target.value})
  }

  handleChange = (e) => {
    console.log(this.state.text);
    this.setState({
      text: e.target.value,
    });
  };

  renderClimate = () => {
    return (
      <>
        <Grid item xs={4}>
          <Temperature temperature={this.state.temperature} />
          <div style={{ marginTop: 20 }}>
            <TextField
              label="Target"
              type="number"
              value={this.state.target}
              onChange={this.updateTarget}
            />
          </div>
        </Grid>
      </>
    );
  };

  render() {
    return (
      <Container style={classes} className={{ root: { flexGrow: 1 } }}>
        <Grid
          container
          spacing={2}
          align="center"
          justify="center"
          direction="row"
        >
          {this.state == null || this.state.loading ? (
            <SyncLoader color={"#3e98c7"} />
          ) : (
            this.renderClimate()
          )}
        </Grid>
      </Container>
    );
  }
}

export default App;
