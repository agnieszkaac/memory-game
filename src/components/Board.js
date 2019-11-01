import React from "react";

import { Image } from "./Image";
import { images, ImageState, randomiseImages } from "../utils";
import "./Board.css";

const INITIAL_STATE = {
  images: randomiseImages(images),
  found: 0
};

export class Board extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

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
    this.setState(INITIAL_STATE);
  };

  render() {
    return (
      <div className="board">
        <div className="score-board">
          <span>Found pairs: {this.state.found}</span>
          <button onClick={this.restart}>Restart</button>
        </div>
        <div className="game-board">
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
        {this.state.found === images.length && <span>YOU WON!</span>}
      </div>
    );
  }
}
