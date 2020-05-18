import React from "react";

import Button from "@material-ui/core/Button";
import { BarLoader } from "react-spinners";
import DoneIcon from "@material-ui/icons/Done";
import { IconButton } from "@material-ui/core";

const doneStyle = {
  marginRight: 5,
  width: 120,
  height: 40,
  marginTop: 10,
  color: "#32CD32",
};

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

    this.props.updateTarget(() => {
      this.setState({ loading: false, done: true });
      setTimeout(() => this.setState({ done: false, clickable: true }), 1000);
    });
  };

  renderDoneButton = () => {
    const buttonStyle = {
      marginRight: 5,
      width: 120,
      height: 40,
      marginTop: 10,
      color: "#fff",
    };

    const variant =
      this.state == null || this.state.loading ? "outlined" : "contained";
    if (variant === "contained") {
      buttonStyle.backgroundColor = "#a881d6";
    }

    return (
      <div>
        <Button
          style={buttonStyle}
          variant={variant}
          onClick={this.updateTarget}
        >
          {this.state == null || this.state.loading ? (
            <BarLoader size={10} color="#3e98c7" />
          ) : (
            <span style={{ marginRight: 5 }}>Update</span>
          )}
        </Button>
      </div>
    );
  };

  render() {
    return (
      <div>
        {!this.state || !this.state.done ? (
          this.renderDoneButton()
        ) : (
          <Button style={doneStyle} variant="outlined">
            <DoneIcon />
          </Button>
        )}
      </div>
    );
  }
}
