import dog1 from "./assets/dog-1.png";
import dog2 from "./assets/dog-2.jpg";
import dog3 from "./assets/dog-3.jpg";
import dog4 from "./assets/dog-4.jpg";
import dog5 from "./assets/dog-5.jpeg";
import dog6 from "./assets/dog-6.jpg";
import dog7 from "./assets/dog-7.jpg";
import dog8 from "./assets/dog-8.jpeg";

export const images = [
  {
    id: 1,
    src: dog1
  },
  {
    id: 2,
    src: dog2
  },
  {
    id: 3,
    src: dog3
  },
  {
    id: 4,
    src: dog4
  },
  {
    id: 5,
    src: dog5
  },
  {
    id: 6,
    src: dog6
  },
  {
    id: 7,
    src: dog7
  },
  {
    id: 8,
    src: dog8
  }
];

export const randomiseImages = images => {
  const doubleImages = [...images, ...images];
  for (let i = doubleImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = doubleImages[i];
    doubleImages[i] = doubleImages[j];
    doubleImages[j] = temp;
  }
  //Apply unique index
  let newArray = [];
  doubleImages.forEach((image, key) => {
    newArray[key] = { ...image, index: key };
  });
  return newArray;
};
