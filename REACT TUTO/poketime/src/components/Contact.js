import React from "react";

const Contact = props => {
  setTimeout(() => {
    props.history.push("/about");
  }, 3000);
  return (
    <div className="container">
      <h4 className="center"> Contact</h4>
      <p>lorem lorem lorem lorem lorem </p>
    </div>
  );
};

export default Contact;
