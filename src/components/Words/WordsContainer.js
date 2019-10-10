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
    let [isAddModalOpened, toggleAddModal] = useState(false);
    let [isEditModalOpened, toggleEditModal] = useState(false);
    // let [modalMode, toggleModalMode] = useState("edit");
    let [word, setWord] = useState({});

    function editWordInModal(wordId) {
        setWord(props.words.find(word => word.id === wordId));
    }
    
    useEffect(() => {
        // console.log("SASDDSA", word);
        if(Object.keys(word).length !== 0) {
            // console.log("!!!!!!!!!!!!!!!!!!!!!", word);
            toggleAddModal(false);
            toggleEditModal(true);
        }

    }, [word]);

    function addWordInModal() {
        toggleAddModal(true);
        toggleEditModal(false);
    }

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
                            <button className="block-shadow round-btn plus-btn" onClick={addWordInModal}></button>
                        </div>
                        <WordsForm
                            mode={"add"}
                            isModalOpened={isAddModalOpened} 
                            onModalClose={() => toggleAddModal(false)} 
                            addWord={props.addWord} 
                            messages={props.wordsFormMessages} 
                            />
                        <WordsForm
                            mode={"edit"}
                            word={word}
                            isModalOpened={isEditModalOpened} 
                            onModalClose={() => toggleEditModal(false)} 
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
                            <WordsView deleteWord={props.deleteWord} editWord={editWordInModal} words={props.words} types={types} />
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