import React from "react";
import style from "./WordsView.module.css";

export default props => {
    const words = props.words.map(word => (
        <div className={[style.wordWrap, "block-m"].join(" ")} key={word.id}>
            <div
                className={[style.word, "block-shadow"].join(" ")}
                onClick={() => props.onSelectWord(word.id)}
            >
                <div>{word.name}</div>
                {word.type !== 0 && <div className={style.type}>{props.types[word.type]}</div>}
            </div>
            <div className={style.wordFuncsWrap}>
                <button className="plus-btn round-btn" onClick={(e) => props.addWordToListToggleMenu(e, word.id)}></button>
                <button className={[style.editWordBtn, "round-btn"].join(" ")} onClick={() => props.editWord(word.id)}></button>
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
};