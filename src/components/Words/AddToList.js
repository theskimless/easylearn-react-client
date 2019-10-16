import React from "react";
import style from "./AddToList.module.css";

export default props => {
  let inlineStyle = {
    width: "150px",
    left: props.x - 150 + 37,
    top: props.y + 37 + 10
  }
  return (
    <div style={inlineStyle} className={[style.wrapper, "block-shadow"].join(" ")}>
      {props.lists.map(list => (
        <div 
          className={style.list} 
          key={list.id} 
          onClick={() => props.onSelectList(list.id)}
        >{list.name}</div>
      ))}
    </div>
  );
};