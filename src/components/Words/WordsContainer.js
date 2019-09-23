import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import WordsView from "./WordsView";
import {getWords} from "../../redux/reducers/wordsReducer";

const WordsContainer = props => {
    // let [words, setWords] = useState([{id: 0, name: "asd"}]);

    useEffect(() => {
        console.log("USE EFFECT")

        props.getWords(4);
    }, []);

    console.log("COMP ITSELF")
    return (
        <div>
            <WordsView words={props.words} />
        </div>
    );
}

const mapStateToProps = state => ({
   words: state.words
});

export default connect(mapStateToProps, {getWords})(WordsContainer);