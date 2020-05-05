import CircularSlider from "@fseehawer/react-circular-slider";
import React from "react";

export default function Target(props) {
  return (
    <div style={{ marginTop: "30vh" }}>
      <CircularSlider
        width={150}
        label="Target"
        hideKnob={true}
        valueFontSize={"2rem"}
        verticalOffset={"0.5rem"}
        dataIndex={props.target - 65}
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
