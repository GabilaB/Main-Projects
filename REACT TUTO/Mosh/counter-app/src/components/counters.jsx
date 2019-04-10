import React, { Component } from "react";
import Counter from "./counter";
import counter from "./counter";

export class counters extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps", prevProps);
    console.log("prevState", prevState);
  }

  render() {
    console.log("rendered");
    const { onReset, counters, onDelete, onIncrement } = this.props;
    return (
      <div>
        <button onClick={onReset} className="btn btn-primary btn-sm m-2">
          Reset
        </button>
        {counters.map(counter => (
          <Counter
            key={counter.id}
            onDelete={onDelete}
            onIncrement={onIncrement}
            counter={counter}
            // value={counter.value}
            // id={counter.id}
          >
            {/* <h4>Counter #{counter.id}</h4> */}
          </Counter>
        ))}
      </div>
    );
  }
}

export default counters;
