import React from "react";
import Modal from "../Modal/Modal";
import style from "./Word.module.css";
import {types} from "../../utils/consts";

export default props => {
    return (
        <Modal title={<button className={"button " + style.type}>{types[props.word.type].toUpperCase()}</button>} onClose={props.onModalClose}>
            <div className={[style.word, style.block].join(" ")}>
                {props.word.name}
            </div>
            <div className={style.block}>
                {props.word.definitions.map((item, key) => (
                    <div className={style.blockItem}>{key + 1}. {item}</div>
                ))}
            </div>
            <div>
                {props.word.examples.map(item => (
                    <div className={style.blockItem}>
                        <div className={style.quote}></div>
                        {item}
                    </div>
                ))}
            </div>
        </Modal>
    );
};