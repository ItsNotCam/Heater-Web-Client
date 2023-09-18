import React from "react";

import Button from "@mui/material/Button";
import { BarLoader } from "react-spinners";
import DoneIcon from "@mui/icons-material/Done";

const doneStyle = {
  marginRight: 5,
  width: 120,
  height: 40,
  marginTop: 10,
  color: "#32CD32",
};

export interface IUpdateButtonProps {
  updateTarget: (callback: () => void) => void;
}

export interface IUpdateButtonState {
  loading: boolean;
  done: boolean;
  clickable: boolean;
}

export default class UpdateButton extends React.Component<IUpdateButtonProps, IUpdateButtonState> {
  super(props: IUpdateButtonProps) {
    this.state = {
      loading: true,
      done: false,
      clickable: true,
    };
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
      this.setState(
        { loading: false, done: true }
      );
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
      backgroundColor: "#fff"
    };

    const variant = this.state == null || this.state.loading ? "outlined" : "contained";
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
            <BarLoader height={10} width={10} color="#3e98c7" />
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
