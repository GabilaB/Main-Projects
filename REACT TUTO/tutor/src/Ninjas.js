import React from "react";

const Ninjas = ({ ninjas }) => {
  // const ninjaList = ninjas.map(ninja => {
  //   if (ninja.age > 30) {
  //     return (
  //       <div className="ninja" key={ninja.id}>
  //         <div>Name: {ninja.name}</div>
  //         <div>Age : {ninja.age}</div>
  //         <div>belt: {ninja.belt}</div>
  //       </div>
  //     );
  //   } else {
  //     return null;
  //   }
  // });
  const ninjaList = ninjas.map(ninja => {
    return ninja.age > 40 ? (
      <div className="ninja" key={ninja.id}>
        <div>Name: {ninja.name}</div>
        <div>Age : {ninja.age}</div>
        <div>belt: {ninja.belt}</div>
      </div>
    ) : null;
  });
  return <div className="ninja-List">{ninjaList}</div>;
};

export default Ninjas;
