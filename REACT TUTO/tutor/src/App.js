import React, { Component } from "react";
import Ninjas from "./Ninjas";

class App extends Component {
  state = {
    ninjas: [
      { name: "Moi", age: "23", belt: "Orange", id: 1 },
      { name: "Pal", age: "52", belt: "Pink", id: 2 },
      { name: "Grill", age: "33", belt: "White", id: 3 }
    ]
  };
  render() {
    return (
      <div className="App">
        <h1>React should be fun </h1>
        <p>Welcoe</p>
        <Ninjas ninjas={this.state.ninjas} />
      </div>
    );
  }
}

export default App;
