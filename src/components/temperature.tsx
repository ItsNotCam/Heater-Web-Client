import React from "react";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ITemperatureJSON } from "../App";

export default function Temperature(props: ITemperatureJSON) {
  const { temperature, target } = props;
  let stroke, fill;

  if (temperature > target) {
    stroke = "rgba(207,59,59,100)";
    fill = "#cf3b3b";
  } else if (temperature < target) {
    stroke = "rgba(5,153,194,100)";
    fill = "#0599c2";
  } else {
    /* GREEN
    stroke = "rgba(20,162,102,100)";
    fill = "#14a266"; */
    stroke = "rgba(168,129,214,100)";
    fill = "#a881d6";
  }

  var styles = {
    path: {
      stroke: stroke,
    },
    text: {
      fill: fill,
    },
  };

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <CircularProgressbar
        value={temperature}
        text={`${temperature}°`}
        minValue={65}
        maxValue={88}
        styles={styles}
      />
    </div>
  );
}
