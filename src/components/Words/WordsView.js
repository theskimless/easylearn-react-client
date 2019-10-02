import React from "react";
import style from "./WordsView.module.css";

export default props => {
    const words = props.words.map(word => (
        <div className={[style.word, "block-shadow block-m"].join(" ")} key={word.id}>
            <div>{word.id}: {word.name}</div>
            <div>
                <button onClick={() => props.onDeleteWord(word.id)}>DELETE</button>
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