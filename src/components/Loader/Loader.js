import React from "react";
import style from "./Loader.module.css";

export default ({loaderSize, circleSize, circlesAmount, circleColor}) => {
  let circles = [];
  let angle = Math.PI * 2 / circlesAmount;
  for(let i = 0; i < circlesAmount; i++) {
    let circleStyle = {
      width: circleSize + "px",
      height: circleSize + "px",
      background: circleColor,
      top: Math.round(Math.sin(angle*i) * (loaderSize / 2 - circleSize / 2) + (loaderSize / 2 - circleSize / 2)) + "px",
      left: Math.round(Math.cos(angle*i) * (loaderSize / 2 - circleSize / 2) + (loaderSize / 2 - circleSize / 2)) + "px"
    }
    circles.push(<div key={i} style={circleStyle} className={style.circle}></div>);
  }
  let loaderStyle = {
    transformOrigin: `${loaderSize/2}px ${loaderSize/2}px`,
    width: loaderSize + "px",
    height: loaderSize + "px"
  };

  return <div style={loaderStyle} className={style.wrapper}>
    {circles}
  </div>
};