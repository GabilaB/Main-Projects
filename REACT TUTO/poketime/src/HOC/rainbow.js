import React from "react";

const Rainbow = wrappedComponent => {
  const colours = ["red", "pink", "green", "orange", "yellow"];
  const randColour = colours[Math.floor(Math.random() * 4)];

  const className = randColour + "-text";

  return props => {
    return (
      <div className={className}>
        <wrappedComponent {...props} />
      </div>
    );
  };
};

export default Rainbow;
