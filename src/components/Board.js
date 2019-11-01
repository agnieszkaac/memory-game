import React from "react";

import { Image } from "./Image";
import { images, randomiseImages } from "../utils";
import "./Board.css";

export class Board extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      images: randomiseImages(images),
      openedImages: [],
      scoredImages: [],
      toHide: [],
      isWinner: false
    };
  }

  onImageClick = image => {
    const openedImages = [...this.state.openedImages];
    if (openedImages.find(i => i.id === image.id)) {
      this.addToScored(image);
      this.cleanOpened([...openedImages, image]);
    } else {
      this.addToOpened(image);
    }
  };

  addToScored = image => {
    this.setState(
      prevState => ({
        scoredImages: [...prevState.scoredImages, image]
      }),
      this.checkResult
    );
  };

  checkResult = () => {
    if (this.state.scoredImages.length === images.length) {
      this.setState({ isWinner: true });
    }
  };

  addToOpened = image => {
    this.setState(
      prevState => ({
        openedImages: [...prevState.openedImages, image]
      }),
      () => this.shouldHide(this.state.openedImages)
    );
  };

  shouldHide = openedItems => {
    if (openedItems.length > 1) {
      setTimeout(() => {
        this.cleanOpened(openedItems);
      }, 1500);
    }
  };

  cleanOpened = images => {
    this.setState(prevState => {
      const openedImages = [
        ...prevState.openedImages.filter(e => !images.includes(e))
      ];
      return { openedImages };
    });
  };

  isImageOpen = image =>
    !!this.state.openedImages.find(i => i.index === image.index) ||
    !!this.state.scoredImages.find(i => i.id === image.id);

  restart = () => {
    this.setState({
      openedImages: [],
      scoredImages: [],
      isWinner: false
    });
    this.setState({ images: randomiseImages(images) });
  };

  render() {
    return (
      <div className="board">
        <div className="score-board">
          Open: {this.state.scoredImages.length}
          <button onClick={this.restart}>Restart</button>
        </div>
        <div className="game-board">
          {this.state.images.map((image, key) => (
            <Image
              key={image.index}
              id={image.id}
              imageSrc={image.src}
              isOpen={this.isImageOpen(image)}
              onClick={() => this.onImageClick(image)}
            />
          ))}
        </div>

        {this.state.isWinner && <div>YOU WON!</div>}
      </div>
    );
  }
}
