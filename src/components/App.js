import React from "react";

import { Board } from "./Board";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <header className="header">Memory game</header>
        <Board />
      </div>
    );
  }
}

export default App;
