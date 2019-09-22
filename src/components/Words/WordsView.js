import React from "react";

export default props => {
    const words = props.words.map(word => (<div key={word.id}>{word.id}: {word.name}</div>));
    console.log("WORDS VIEW")
    return (
        <div>
            {words}
        </div>
    );
}