import React from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { Container, Grid } from "@material-ui/core";


import Temperature from "./components/temperature";
import Target from "./components/target";
import PowerButton from "./components/power";


const ws = new WebSocket('ws://192.168.50.184:3005')


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
      on: true
    };
  }

  componentDidMount() {
    const msg = JSON.stringify({ action: "receive" });
    ws.onopen = () => {
      console.log("websocket connected");
      setTimeout(() => {ws.send(msg)}, 500)
    };

    ws.onmessage = (event) => {
      console.log(event);
      const data = JSON.parse(event.data)
      this.setState({
        temperature: parseInt(data.temperature),
        target: data.target,
        deadzone: data.deadzone,
        on: data.on
      })
    };

    setInterval(() => {
      if (ws != null) {
        console.log(msg);
        ws.send(msg);
      }
    }, 5000);
  }

  updateSocket = (e) => {
    e.preventDefault();
    console.log(this.state.text);
    ws.send(JSON.stringify({ action: this.state.text }));
    this.setState({
      text: "",
    });
  };

  handleChange = (e) => {
    console.log(this.state.text);
    this.setState({
      text: e.target.value,
    });
  };


  /* START HERE */

  renderClimate = () => {
    return (
      <>
        <Grid item xs={3}>
          <PowerButton on={this.state.on} toggle={this.toggle} />
        </Grid>
        <Grid item xs={4}>
          <Temperature temperature={this.state.temperature} />
        </Grid>
        <Grid item xs={3}>
          <Target target={this.state.target} />
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
          {this.state == null || this.state.loading ? <SyncLoader color={"#3e98c7"} /> : this.renderClimate()}
        </Grid>
      </Container>
    );
  }
  /* END HERE */



  // render() {
  //   if (this.state == null) {
  //     return "loading";
  //   }

  //   const { temperature, target, deadzone, on } = JSON.parse(
  //     this.state.message
  //   );
  //   const display = (
  //     <p>
  //       Temperature: {temperature}
  //       <br></br>
  //       Target: {target}
  //       <br></br>
  //       Deadzone: {deadzone}
  //       <br></br>
  //       On: {on ? "on" : "off"}
  //     </p>
  //   );

  //   return (
  //     <div>
  //       {display}
  //       <button type="submit" value="send message" onClick={this.updateSocket}>
  //         Send Message
  //       </button>
  //       <input
  //         type="text"
  //         value={this.state.text}
  //         onChange={this.handleChange}
  //       ></input>
  //     </div>
  //   );
  // }
}

export default App;
