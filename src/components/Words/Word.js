import React from "react";
import Modal from "../Modal/Modal";
import style from "./Word.module.css";
import {types} from "../../utils/consts";

export default props => {
    return (
        <Modal 
            title={
                props.word.type !== 0 &&
                <span className={"button " + style.type}>{types[props.word.type].toUpperCase()}</span>
            } 
            onClose={props.onModalClose}
        >
            <div className={[style.word, style.block].join(" ")}>
                {props.word.name}
            </div>
            <div className={style.block}>
                {props.word.definitions.map((item, key) => (
                    <div key={key} className={style.blockItem}>{key + 1}. {item}</div>
                ))}
            </div>
            <div>
                {props.word.examples.map((item, key) => (
                    <div key={key} className={style.blockItem}>
                        <div className={style.quote}></div>
                        {item}
                    </div>
                ))}
            </div>
        </Modal>
    );
};