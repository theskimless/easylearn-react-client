import React from "react";
import style from "./WordsView.module.css";

export default props => {
    const words = props.words.map(word => (
        <div className={[style.wordWrap, "block-m"].join(" ")} key={word.id}>
            <div className={[style.word, "block-shadow"].join(" ")}>
                <div>{word.name}</div>
                <div className={style.type}>{props.types[word.type]}</div>
            </div>
            <div className={style.wordFuncsWrap}>
                <button className={[style.deleteWordBtn, "round-btn"].join(" ")} onClick={() => props.deleteWord(word.id)}></button>
            </div>
        </div>
    ));

    console.log("WORDS VIEW")
    return (
        <div>
            {words}
        </div>
    );
}