import React from "react";

import {Image} from "./Image";
import {images, randomiseImages} from "../utils";
import "./Board.css";

export class Board extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      images: randomiseImages(images),
      openedImages: [],
      scoredImages: [],
      toHide: [],
      isWinner: false,
    }
  }

  onClick = image => {
    const openedImages = [...this.state.openedImages];
    if(openedImages.find(i => i.id === image.id)) {
      this.setScoredImages(image);
      this.removeItems([...openedImages, image]);
    } else {
      this.addToOpened(image);
    }
  };

  setScoredImages = (image) => {
    this.setState(prevState => ({
        scoredImages: [...prevState.scoredImages, image]
      }),
      this.checkResult)
  };

  checkResult = () => {
    if(this.state.scoredImages.length === images.length) {
      this.setState({ isWinner: true });
    }
  };

  addToOpened = image => {
    this.setState(prevState => ({
        openedImages: [...prevState.openedImages, image]
      }),
      ()=>this.shouldHide(this.state.openedImages));
  };

  shouldHide = (openedItems) => {
    if(openedItems.length > 1) {
      setTimeout(() => {
        this.removeItems(openedItems)
      }, 1500)
    }
  };

  removeItems = (items) => {
    this.setState(prevState => {
      const openedImages = [...prevState.openedImages.filter(e => !items.includes(e))];
      return { openedImages };
    })
  };

  isImageOpen = (image) =>
    !!this.state.openedImages.find(i => i.index === image.index) || !!this.state.scoredImages.find(i => i.id === image.id);

  restart = () => {
    this.setState({
      openedImages: [],
      scoredImages: [],
      isWinner: false});
    this.setState({ images: randomiseImages(images)})
  };

  render() {
    return (
      <div className="board">
        <div className="score-board">
          Open: {this.state.scoredImages.length}
          <button onClick={this.restart}>Restart</button>
        </div>
        <div className="game-board">
          {!this.state.isWinner && this.state.images.map((image, key) => (
            <Image
              key={image.index}
              id={image.id}
              imageSrc={image.src}
              isOpen={this.isImageOpen(image)}
              onClick={() => this.onClick(image)}
            />
          )
          )}
        </div>

        {this.state.isWinner && (
          <div>YOU WON!</div>
        )}
      </div>
    )
  }
}