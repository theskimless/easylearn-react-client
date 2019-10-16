import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import WordsForm from "./WordsForm";
import WordsView from "./WordsView";
import {addWordToList, getLists} from "../../redux/reducers/listsReducer";
import {getWords, requestAddWord, requestEditWord, deleteWord, notifyNoWords} from "../../redux/reducers/wordsReducer";
import Loader from '../Loader/Loader';
import NotificationsContainer from "../Notification/NotificationsContainer";
import {setNotifications} from "../../redux/reducers/notificationsReducer";
import {types} from "../../utils/consts";
import Word  from "./Word";
import {splitWordProps} from "../../utils/wordsHelper";
import AddToList from "../Words/AddToList";

const WordsContainer = props => {
    let [isWordFormModalOpened, toggleWordFormModal] = useState(false);
    let [isWordModalOpened, toggleWordModal] = useState(false);
    let [mode, setMode] = useState("add");
    let [word, setWord] = useState({});
    let [x, setX] = useState(0);
    let [y, setY] = useState(0);
    let [isAddToListModalOpened, toggleAddToListModal] = useState(false);

    console.log(props.lists);
    
    useEffect(() => {
        if(props.isAuthenticated) {
            props.getWords(4);
            props.getLists();
        }
        else {
            props.setNotifications("words", [{type: "error", title: "No access to words", message: "You aren't logged in"}]);
        }
    }, [props.isAuthenticated]);

    useEffect(() => {
        if(!props.isFetching) {
            props.notifyNoWords(props.words);
        }
    }, [props.words, props.isFetching]);

    function addWord() {
        setMode("add");
        toggleWordFormModal(true)
    }

    function editWord(wordId) {
        setMode("edit");
        let word = splitWordProps(props.words.filter(word => word.id === wordId)[0])
        setWord(word);
        toggleWordFormModal(true);
    }

    function selectWord(wordId) {
        let word = splitWordProps(props.words.filter(word => word.id === wordId)[0])
        setWord(word);
        toggleWordModal(true);
    }

    function addWordToListToggleMenu(e, wordId) {
        let elem = e.target;
        setX(elem.offsetLeft);
        setY(elem.offsetTop);
        setWord(wordId);
        toggleAddToListModal(!isAddToListModalOpened);
    }

    function selectList(listId) {
        props.addWordToList(word, listId);
    }

    console.log("RELOAD WORDS");
    return (
        <>
            {
                props.isAuthenticated && 
                (
                    <>
                        {
                            isAddToListModalOpened &&
                            <AddToList
                                lists={props.lists}
                                x={x} 
                                y={y}
                                onSelectList={selectList}
                            />
                        }
                        <div className="text-center block-m">
                            <button className="block-shadow round-btn plus-btn" onClick={addWord}></button>
                        </div>
                        {
                            isWordFormModalOpened &&
                            <WordsForm
                                mode={mode}
                                word={word}
                                onModalClose={() => toggleWordFormModal(false)}
                                addWord={props.requestAddWord}
                                editWord={props.requestEditWord}
                                messages={props.wordsFormMessages}
                            />
                        }
                        {
                            isWordModalOpened &&
                            <Word
                                word={word}
                                onModalClose={() => toggleWordModal(false)}
                            />
                        }
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
                            <WordsView
                                addWordToListToggleMenu={addWordToListToggleMenu}
                                onSelectWord={selectWord}
                                deleteWord={props.deleteWord}
                                editWord={editWord}
                                words={props.words}
                                types={types}
                            />
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
   wordsFormMessages: state.wordsReducer.wordsFormMessages,
   lists: state.listsReducer.lists
});

export default connect(mapStateToProps, {addWordToList, getLists, getWords, requestAddWord, requestEditWord, deleteWord, setNotifications, notifyNoWords})(WordsContainer);