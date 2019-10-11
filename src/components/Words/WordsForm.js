import React from "react";
import Modal from "../Modal/Modal";
import useInput from "../../utils/useInput";
import inputHelper from "../../utils/inputHelper";
import {types} from "../../utils/consts";

export default props => {
    function validateWord(word) {
        const minLength = 2;
        let errors = [];
        if(word.length < minLength) {
            errors.push("Word's length can't be less then " + minLength);
        }
        return errors;
    }

    let [inputs, validateForm] = inputHelper({
        word: useInput("", validateWord),
        type: useInput(0)
    });

    function handleSubmit(e) {
        e.preventDefault();
        console.log(validateForm());
        if(validateForm()) {
            // let form = new FormData(e.target);
            // props.addWord(form);
        }
    }

    return (
        <>
            {props.isModalOpened && (
                <Modal title="Add word" messages={props.messages} onClose={props.onModalClose}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-field">
                            <div className="form-field__title">Word</div>
                            {inputs.word.errors.map((item, key) => <div key={key} className="form-field__error">{item}</div>)}
                            <input type="text" {...inputs.word.bind} />
                        </div>

                        <div className="form-field">
                            <div className="form-field__title">Type</div>
                            <select {...inputs.type.bind}>
                                {types.map((type, key) => (
                                    <option value={key} key={key}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div className="text-center">
                            <button className="button">Add word</button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
};