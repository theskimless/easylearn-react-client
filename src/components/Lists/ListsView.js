import React from "react";
import style from "../Words/WordsView.module.css";

export default props => {
    const lists = props.lists.map(list => (
        <div className={[style.wordWrap, "block-m"].join(" ")} key={list.id}>
            <div
                className={[style.word, "block-shadow"].join(" ")}
                onClick={() => props.onSelectList(list.id)}
            >
                <div>{list.name}</div>
            </div>
            <div className={style.wordFuncsWrap}>
                <button className={[style.editWordBtn, "round-btn"].join(" ")} onClick={() => props.editList(list.id)}></button>
                <button className={[style.deleteWordBtn, "round-btn"].join(" ")} onClick={() => props.deleteList(list.id)}></button>
            </div>
        </div>
    ));

    console.log("LIST VIEW")
    return (
        <div>
            {lists}
        </div>
    );
};