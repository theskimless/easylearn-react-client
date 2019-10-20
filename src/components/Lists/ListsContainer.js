import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import List from "./List";
import ListsView from "./ListsView";
import ListsForm from "./ListsForm";
import {getLists, notifyNoLists, requestAddList, requestEditList, requestDeleteList} from "../../redux/reducers/listsReducer";
import Loader from "../Loader/Loader";
import NotificationsContainer from "../Notification/NotificationsContainer";

const ListsContainer = props => {
    let [isListFormModalOpened, toggleListFormModal] = useState(false);
    let [isListModalOpened, toggleListModal] = useState(false);
    let [mode, setMode] = useState("add");
    let [list, setList] = useState({});

    useEffect(() => {
        if(!props.isAuthenticated) {
            props.setNotifications("lists", [{type: "error", title: "No access to lists", message: "You aren't logged in"}]);
        }
    }, [props.isAuthenticated]);

    useEffect(() => {
        console.log("USE EFFECT", props.lists);
        if(!props.isFetching) {
            props.notifyNoLists(props.lists);
        }
    }, [props.lists, props.isFetching]);

    function addList() {
        toggleListFormModal(true);
    }

    function editList(listId) {
        setList(connectListWithWords(props.lists.find(list => list.id === listId), props.words));
        setMode("edit");
        toggleListFormModal(true);
    }

    function connectListWithWords(list, words) {
        let newList = {
            ...list,
            words: list.words.map(wordObj => words.find(word => wordObj.id === word.id))
        }
        return newList;
    }

    function selectList(listId) {
        setList(connectListWithWords(props.lists.find(list => list.id === listId), props.words));
        toggleListModal(true);
    }

    return (
        <>
            <div className="text-center block-m">
                <button className="block-shadow round-btn plus-btn" onClick={addList}></button>
            </div>
            {
                props.isAuthenticated &&
                <>
                    {
                        isListFormModalOpened &&
                        <ListsForm
                            mode={mode}
                            list={list}
                            onModalClose={() => toggleListFormModal(false)}
                            addList={props.requestAddList}
                            editList={props.requestEditList}
                        />

                    }
                    {
                        isListModalOpened &&
                        <List 
                            list={list}
                            onModalClose={() => toggleListModal(false)}
                        />
                    }

                    <NotificationsContainer width="576" notifications={props.notifications} />
                    {
                        props.isFetching &&
                        <div className="loader-wrapper"><Loader loaderSize="50" circleSize="5" circleColor="#369" circlesAmount="8" /></div>
                    }
                    <ListsView
                        lists={props.lists}
                        editList={editList}
                        deleteList={props.requestDeleteList}
                        onSelectList={selectList}
                    />
                </>
            }
        </>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.profile.isAuthenticated,
    lists: state.listsReducer.lists,
    words: state.wordsReducer.words,
    isFetching: state.listsReducer.isFetching,
    notifications: state.notificationsReducer.lists
});

export default connect(mapStateToProps, {
    getLists, 
    notifyNoLists, 
    requestAddList, 
    requestEditList, 
    requestDeleteList
})(ListsContainer);