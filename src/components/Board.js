import React from "react";

import { Image } from "./Image";
import { images, ImageState, randomiseImages } from "../utils";
import "./Board.css";

export class Board extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    images: randomiseImages(images),
    found: 0
  });

  onClick = image => {
    const opened = this.findOpened();
    if (opened.length > 1) {
      this.close(opened);
    }
    this.open(image);
  };

  findOpened = () =>
    this.state.images.filter(image => image.state === ImageState.Opened);

  close = opened => {
    opened.map(i => {
      i.state = ImageState.Closed;
      return i;
    });
  };

  open = image => {
    this.setState(prevState => {
      const newImages = prevState.images.map(i => {
        if (i.index === image.index) {
          i.state = ImageState.Opened;
          return i;
        } else {
          return i;
        }
      });
      return { images: newImages };
    }, this.match);
  };

  match = () => {
    const opened = this.findOpened();
    if (opened.length > 1 && opened[0].id === opened[1].id) {
      this.setState(prevState => {
        const newImages = prevState.images.map(i => {
          if (opened.filter(o => o.id === i.id).length > 0) {
            i.state = ImageState.Matched;
            return i;
          } else {
            return i;
          }
        });
        return {
          images: newImages,
          found: prevState.found + 1
        };
      });
    }
  };

  restart = () => {
    this.setState(this.getInitialState());
  };

  render() {
    const won = this.state.found === images.length;
    return (
      <div className="board">
        <div className="score-board">
          <div className="score">
            <span className="points">{this.state.found}</span>
            <span>Score</span>
          </div>
          <button className="restart-button" onClick={this.restart}>
            New Game
          </button>
        </div>
        <div className={`game-board ${won ? "won" : ""}`}>
          {this.state.images.map(image => (
            <Image
              key={image.index}
              id={image.id}
              imageSrc={image.src}
              isOpen={
                image.state === ImageState.Opened ||
                image.state === ImageState.Matched
              }
              onClick={() => this.onClick(image)}
            />
          ))}
        </div>
        {won && <div className="won-message">YOU WON!</div>}
      </div>
    );
  }
}
