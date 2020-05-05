import IconButton from "@material-ui/core/IconButton";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

import React from "react";

export default function PowerButton(props) {
  return (
    <div style={{ marginTop: "40vh" }}>
      <IconButton
        color={props.on ? "primary" : "disabled"}
        size="medium"
        children={<PowerSettingsNewIcon fontSize="large" />}
        variant="contained"
        onClick={props.toggle}
      ></IconButton>
    </div>
  );
}
