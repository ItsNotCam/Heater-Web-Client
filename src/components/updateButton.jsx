import React from "react";

import Button from "@material-ui/core/Button";
import { BarLoader } from "react-spinners";
import DoneIcon from "@material-ui/icons/Done";

const buttonStyle = { marginRight: 5, width: 120, height: 40, marginTop: 10 };

export default class UpdateButton extends React.Component {
  super(props) {
    this.state = {
      loading: true,
      done: false,
      clickable: true,
    };

    this.props = props;
  }

  componentDidMount = () => {
    this.setState({
      loading: false,
      clickable: true,
    });
  };

  updateTarget = () => {
    if (!this.state.clickable) {
      return;
    }

    this.setState({
      loading: true,
      clickable: false,
    });

    // temporary timeout for testing purposes
    this.props.updateTarget(() => {
      console.log("callback");
      this.setState({ loading: false, done: true });
      setTimeout(() => this.setState({ done: false, clickable: true }), 1000);
    });
  };

  render() {
    return (
      <div>
        <Button
          style={buttonStyle}
          variant="outlined"
          color="primary"
          onClick={this.updateTarget}
        >
          {this.state == null || this.state.loading ? (
            <BarLoader size={10} color="#3e98c7" />
          ) : this.state.done ? (
            <DoneIcon></DoneIcon>
          ) : (
            <>
              <span style={{ marginRight: 5 }}>Update</span>
            </>
          )}
        </Button>
      </div>
    );
  }
}
