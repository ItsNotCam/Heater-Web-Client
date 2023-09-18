import { IconButton } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

import React from "react";

export default function PowerButton(props: any) {
  return (
    <div style={{ marginTop: "40vh" }}>
      <IconButton size="medium" onClick={props.toggle} className="contained" children={<PowerSettingsNewIcon fontSize="large" />} />
    </div>
  );
}
