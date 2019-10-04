import React, {useEffect} from "react";
import {connect} from "react-redux";
import WordsForm from "./WordsForm";
import WordsView from "./WordsView";
import {getWords, addWord, deleteWord} from "../../redux/reducers/wordsReducer";
import Loader from '../Loader/Loader';
import NotificationsContainer from "../Notification/NotificationsContainer";
import {setNotifications} from "../../redux/reducers/notificationsReducer";
import {types} from "../../utils/consts";

const WordsContainer = props => {
    useEffect(() => {
        if(props.isAuthenticated) {
            props.getWords(4);
        }
        else {
            props.setNotifications("words", [{type: "error", title: "No access to words", message: "You aren't logged in"}]);
        }
    }, [props.isAuthenticated]);

    return (
        <>
            {
                props.isAuthenticated && <WordsForm addWord={props.addWord} />
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
                            <WordsView deleteWord={props.deleteWord} words={props.words} types={types} />
                        }
                    </>
                )
            }
        </>
    );
}

const mapStateToProps = state => ({
   words: state.wordsReducer.words,
   isFetching: state.wordsReducer.isFetching,
   notifications: state.notificationsReducer.words,
   isAuthenticated: state.profile.isAuthenticated
});

export default connect(mapStateToProps, {getWords, addWord, deleteWord, setNotifications})(WordsContainer);