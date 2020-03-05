import "rc-slider/assets/index.css";

import React from "react";
import Slider from "rc-slider";

export default class CustomSlider extends React.Component {
  onSliderChange = value => {
    const trueValue = value / 100;

    this.props.handler(this.props.name, trueValue);
  };

  render() {
    return (
      <Slider
        value={this.props.value * 100}
        onChange={this.onSliderChange}
        marks={{ 0: 0, 20: 0.2, 40: 0.4, 60: 0.6, 80: 0.8, 100: 1 }}
      />
    );
  }
}
