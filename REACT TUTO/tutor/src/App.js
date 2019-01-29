import React, { Component } from "react";
import Ninjas from "./Ninjas";
import AddNinja from "./AddNinja";

class App extends Component {
  state = {
    ninjas: [
      { name: "Moi", age: "23", belt: "Orange", id: 1 },
      { name: "Pal", age: "52", belt: "Pink", id: 2 },
      { name: "Grill", age: "33", belt: "White", id: 3 }
    ]
  };
  addNinja = ninja => {
    ninja.id = Math.random();
    let ninjas = [...this.state.ninjas, ninja];
    this.setState({
      ninjas: ninjas
    });
  };

  deleteNinja = id => {
    let ninjas = this.state.ninjas.filter(ninja => {
      return ninja.id !== id;
    });
    this.setState({
      ninjas: ninjas
    });
  };

  componentDidMount() {
    console.log("compo mount");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("compo Updated");
    console.log(prevProps, prevState);
  }

  render() {
    return (
      <div className="App">
        <h1>React should be fun </h1>
        <p>Welcoe</p>
        <Ninjas deleteNinja={this.deleteNinja} ninjas={this.state.ninjas} />
        <AddNinja addNinja={this.addNinja} />
      </div>
    );
  }
}

export default App;
