import React from "react";
import Modal from "../Modal/Modal";
import style from "./List.module.css";
import {types} from "../../utils/consts";

export default props => {
    const words = props.list.words.map(word => (
        <div className={style.word} key={word.id}>
            <div>{word.name}</div>
            {word.type !== 0 && <div className={[style.type, "button"].join(" ")}>{types[word.type]}</div>}
        </div>
    ));
    
    return (
        <Modal title={props.list.name} onClose={props.onModalClose}>
            {words}
        </Modal>
    );
};