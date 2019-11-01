import React from "react";
import PropsTypes from "prop-types";

import "./Image.css";
import question from "../assets/question-mark.png";

export class Image extends React.PureComponent {
  render() {
    return this.props.isOpen ? (
      <img className="image" src={this.props.imageSrc} alt="" />
    ) : (
      <img
        className="image blank"
        src={question}
        alt=""
        onClick={this.props.onClick}
      />
    );
  }
}

Image.propTypes = {
  id: PropsTypes.number,
  imageSrc: PropsTypes.string,
  isOpen: PropsTypes.bool,
  onClick: PropsTypes.func
};
