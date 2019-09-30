import React, {useEffect} from "react";
import {connect} from "react-redux";
import WordsView from "./WordsView";
import {getWords} from "../../redux/reducers/wordsReducer";
import Loader from '../Loader/Loader';
import NotificationsContainer from "../Notification/NotificationsContainer";

const WordsContainer = props => {
    useEffect(() => {
        console.log("USE EFFECT WORDS CONTAINER")

        props.getWords(4);
    }, []);
    
    return (
        <>
            <NotificationsContainer width="576" notifications={props.notifications} />
            {
                props.words.length !== 0 ? 
                <WordsView words={props.words} /> :
                props.notifications.length === 0 && <div className="loader-wrapper"><Loader loaderSize="50" circleSize="5" circleColor="#369" circlesAmount="8" /></div>
            }
        </>
    );
}

const mapStateToProps = state => ({
   words: state.wordsReducer.words,
   notifications: state.wordsReducer.notifications
});

export default connect(mapStateToProps, {getWords})(WordsContainer);