import React, { Component } from "react";
import Todos from "./components/Todos";

import "./App.css";

class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: "Eat",
        completed: false
      },
      {
        id: 2,
        title: "Sleep",
        completed: false
      },
      {
        id: 3,
        title: "Run",
        completed: false
      }
    ]
  };

  markComplete = id => {
    console.log(id);
  };

  render() {
    return (
      <div className="App">
        <h1>APP</h1>
        <Todos todos={this.state.todos} markComplete={this.markComplete} />
      </div>
    );
  }
}

export default App;
