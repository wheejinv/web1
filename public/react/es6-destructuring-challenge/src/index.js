// CHALLENGE: uncomment the code below and see the car stats rendered
import React from "react";
import ReactDOM from "react-dom";
import practice from "./practice";

const [tesla, honda] = practice;

// 아래와 동치.
// const teslaTopColour = tesla.coloursByPopularity[0]
// const [teslaTopColour] = tesla.coloursByPopularity;
const {coloursByPopularity: [teslaTopColour]} = tesla;

// const teslaTopSpeed = tesla.speedStats.topSpeed
const {
	speedStats: {topSpeed: teslaTopSpeed}
} = tesla;

// const teslaTopColour = tesla.coloursByPopularity[0]
// const [hondaTopColour] = honda.coloursByPopularity;
const {coloursByPopularity: [hondaTopColour]} = honda;

// const hondaTopSpeed = honda.speedStats.topSpeed
const {
	speedStats: {topSpeed: hondaTopSpeed}
} = honda;

ReactDOM.render(
  <table>
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
    </tr>
    <tr>
      <td>{tesla.model}</td>
      <td>{teslaTopSpeed}</td>
      <td>{teslaTopColour}</td>
    </tr>
    <tr>
      <td>{honda.model}</td>
      <td>{hondaTopSpeed}</td>
      <td>{hondaTopColour}</td>
    </tr>
  </table>,
  document.getElementById("root")
);
