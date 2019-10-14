import {listsApi} from "../../api/api";
import {setNotifications} from "../reducers/notificationsReducer";
import { stat } from "fs";

const initialState = {
    lists: [],
    isFetching: false
}

export const requestAddList = list => ({
    type: "withCreds",
    thunk: dispatch => {
        return new Promise((resolve, reject) => {
            listsApi.addList(list)
            .then(res => {
                if(res.status === 201) {
                    dispatch(pushList(res.data));
                    resolve();
                }
            })
            .catch(err => {
                reject();
            });
        });
    }
});

export const requestEditList = list => ({
    type: "withCreds",
    thunk: dispatch => {
        return new Promise((resolve, reject) => {
            listsApi.editList(list)
            .then(res => {
                if(res.status === 200) {
                    dispatch(editList(res.data));
                    resolve();
                }
            })
            .catch(err => {
                reject();
            });
        });
    }
});

export const requestDeleteList = listId => ({
    type: "withCreds",
    thunk: dispatch => {
        listsApi.deleteList(listId)
        .then(res => {
            if(res.status === 204) {
                dispatch(removeList(listId));
            }
        })
        .catch(err => console.log(err.response));
    }
});

export const getLists = () => ({
    type: "withCreds",
    thunk: dispatch => {
        dispatch(setFetching(true));

        listsApi.getLists()
        .then(res => {
            console.log(res);
            if(res.status === 200) {
                res.data.length !== 0 && dispatch(setLists(res.data));
                dispatch(setFetching(false));
                dispatch(setNotifications("lists", []));
            }            
        })
        .catch(err => {
            dispatch(setFetching(false));
            console.log(err);
        });
    }
})

export const notifyNoLists = lists => dispatch => {
    console.log(lists);
    if(lists.length === 0)
        dispatch(setNotifications("lists", [{type: "", title: "You have no lists"}]))
};

const PUSH_LIST = "PUSH_LIST";
export const pushList = list => ({type: PUSH_LIST, list});

const REMOVE_LIST = "REMOVE_LIST";
export const removeList = listId => ({type: REMOVE_LIST, listId});

const EDIT_LIST = "EDIT_LIST";
export const editList = list => ({type: EDIT_LIST, list}); 

const SET_FETCHING = "SET_FETCHING";
export const setFetching = state => ({type: SET_FETCHING, state}); 

const SET_LISTS = "SET_LISTS";
export const setLists = lists => ({type: SET_LISTS, lists});

export default (state = initialState, action) => {
    switch(action.type) {
        case EDIT_LIST:
            return {
                ...state,
                lists: state.lists.map(list => list.id === action.list.id ? action.list : list)
            };
        case PUSH_LIST:
            return {
                ...state,
                lists: [
                    ...state.lists,
                    action.list
                ]
            };
        case REMOVE_LIST:
            return {
                ...state,
                lists: state.lists.filter(list => list.id === action.listId ? false : true)
            };
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.state
            };
        case SET_LISTS:
            return {
                ...state,
                lists: action.lists
            };
        default:
            return state;
    }
}