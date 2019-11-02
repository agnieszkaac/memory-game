import React from "react";
import PropsTypes from "prop-types";

import "./Image.css";
import paw from "../assets/paw.png";

export class Image extends React.PureComponent {
  render() {
    return this.props.isOpen ? (
      <img className="image" src={this.props.imageSrc} alt="" />
    ) : (
      <div className="image blank" onClick={this.props.onClick}>
        <img className="" src={paw} alt="" />
      </div>
    );
  }
}

Image.propTypes = {
  id: PropsTypes.number,
  imageSrc: PropsTypes.string,
  isOpen: PropsTypes.bool,
  onClick: PropsTypes.func
};
