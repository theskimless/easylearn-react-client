import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import WordsForm from "./WordsForm";
import WordsView from "./WordsView";
import {getWords, addWord, deleteWord, notifyNoWords} from "../../redux/reducers/wordsReducer";
import Loader from '../Loader/Loader';
import NotificationsContainer from "../Notification/NotificationsContainer";
import {setNotifications} from "../../redux/reducers/notificationsReducer";
import {types} from "../../utils/consts";

const WordsContainer = props => {
    let [isModalOpened, toggleModal] = useState(false);

    useEffect(() => {
        if(props.isAuthenticated) {
            console.log("LOADING WORDS");
            props.getWords(4);
        }
        else {
            props.setNotifications("words", [{type: "error", title: "No access to words", message: "You aren't logged in"}]);
        }
    }, [props.isAuthenticated]);

    useEffect(() => {
        console.log("BEFORE isFetching");
        if(!props.isFetching) {
            console.log("NOTIFY WORDS");
            props.notifyNoWords(props.words);
        }
    }, [props.words, props.isFetching]);

    console.log("RELOAD WORDS");
    return (
        <>
            {
                props.isAuthenticated && 
                (
                    <>
                        <div className="text-center block-m">
                            <button className="block-shadow round-btn plus-btn" onClick={() => toggleModal(true)}></button>
                        </div>
                        <WordsForm
                            isModalOpened={isModalOpened} 
                            onModalClose={() => toggleModal(false)} 
                            addWord={props.addWord} 
                            messages={props.wordsFormMessages} 
                            />
                    </>
                )
            }
            <NotificationsContainer width="576" notifications={props.notifications} />
            {
                props.isAuthenticated &&
                (
                    <>
                        {
                            props.isFetching && 
                            <div className="loader-wrapper"><Loader loaderSize="50" circleSize="5" circleColor="#369" circlesAmount="8" /></div>
                        }
                        {
                            props.words.length !== 0 &&
                            <WordsView deleteWord={props.deleteWord} editWord={() => console.log("Not implemented yet")} words={props.words} types={types} />
                        }
                    </>
                )
            }
        </>
    );
};

const mapStateToProps = state => ({
   words: state.wordsReducer.words,
   isFetching: state.wordsReducer.isFetching,
   notifications: state.notificationsReducer.words,
   isAuthenticated: state.profile.isAuthenticated,
   wordsFormMessages: state.wordsReducer.wordsFormMessages
});

export default connect(mapStateToProps, {getWords, addWord, deleteWord, setNotifications, notifyNoWords})(WordsContainer);