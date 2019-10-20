import React from "react";
import style from "./AddToList.module.css";

export default props => {
  let inlineStyle = {
    width: "150px",
    left: props.x - 150 + 37,
    top: props.y + 37 + 10
  }
  const lists = props.lists.reduce((accum, list) => {
    if(!list.words.find(word => word.id === props.wordId)) {
      accum.push(
        <div 
          className={style.list} 
          key={list.id} 
          onClick={() => props.onSelectList(list.id)}
        >{list.name}</div>
      );
    }
    return accum
  }, []);

  return (
    <div style={inlineStyle} className={[style.wrapper, "block-shadow"].join(" ")}>
      {
        lists.length === 0 ?
        <div className={style.list}>
          NO LISTS
        </div> :
        lists
      }
    </div>
  );
};