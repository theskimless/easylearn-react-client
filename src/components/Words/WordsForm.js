import React from "react";
import Modal from "../Modal/Modal";
import {types} from "../../utils/consts";
import { withFormik, Form, Field, FieldArray } from "formik";

const WordsForm = props => {
    return (
        <Modal title={props.mode + " word"} messages={props.messages} onClose={props.onModalClose}>
            <Form>
                {/* WORD */}
                <div className="form-field">
                    <div className="form-field__title">Word</div>
                    {props.errors.word && <div className="form-field__error">{props.errors.word}</div>}
                    <Field type="text" name="word" className={props.errors.word && "form-field__input_invalid"} />
                </div>

                {/* TYPE */}
                <div className="form-field">
                    <div className="form-field__title">Type</div>
                    <Field component="select" name="type">
                        {types.map((type, key) => (
                            <option value={key} key={key}>{type}</option>
                        ))}
                    </Field>
                </div>

                {/* DEFINITIONS */}
                <div className="form-field">
                    <div className="form-field__title">Definitions</div>
                    <FieldArray 
                        name="defs"
                        render={arrayHelpers =>
                            arrayHelpers.form.values.defs && arrayHelpers.form.values.defs.length !== 0 ?
                            arrayHelpers.form.values.defs.map((item, key) => 
                                <div className="form-field__array form-field__inp_m" key={key}>
                                    <Field name={"defs." + key} />
                                    {
                                        key === arrayHelpers.form.values.defs.length - 1 ?
                                        <button 
                                            className="block-shadow round-btn plus-btn form-field__array__btn"
                                            type="button"
                                            onClick={() => arrayHelpers.insert(arrayHelpers.form.values.defs.length)}
                                        ></button> :
                                        <button 
                                            className="block-shadow round-btn minus-btn form-field__array__btn"
                                            type="button"
                                            onClick={() => arrayHelpers.remove(key)}
                                        ></button>
                                    }
                                </div>
                            ):
                            (<div></div>)
                        }
                    />
                </div>

                {/* EXAMPLES */}
                <div className="form-field">
                    <div className="form-field__title">Examples</div>
                    <FieldArray 
                        name="examples"
                        render={arrayHelpers =>
                            arrayHelpers.form.values.examples && arrayHelpers.form.values.examples.length !== 0 ?
                            arrayHelpers.form.values.examples.map((item, key) => 
                                <div className="form-field__array form-field__inp_m" key={key}>
                                    <Field name={"examples." + key} />
                                    {
                                        key === arrayHelpers.form.values.examples.length - 1 ?
                                        <button 
                                            className="block-shadow round-btn plus-btn form-field__array__btn"
                                            type="button"
                                            onClick={() => arrayHelpers.insert(arrayHelpers.form.values.examples.length)}
                                        ></button> :
                                        <button 
                                            className="block-shadow round-btn minus-btn form-field__array__btn"
                                            type="button"
                                            onClick={() => arrayHelpers.remove(key)}
                                        ></button>
                                    }
                                </div>
                            ):
                            (<div></div>)
                        }
                    />
                </div>

                {/* SUBMIT BUTTON */}
                <div className="text-center">
                    <button
                        disabled={props.isSubmitting}
                        type="submit"
                        className="button">{props.mode[0].toUpperCase() + props.mode.slice(1)} word</button>
                </div>
            </Form>
        </Modal>
    );
};

export default withFormik({
    mapPropsToValues({mode, word}) {
        if(mode === "edit") {
            return {
                word: word && word.name || "",
                type: word && word.type || 0,
                defs: word && word.defs || [""],
                examples: word && word.examples || [""]
            }
        }
        else {
            return {
                word: "",
                type: 0,
                defs: [""],
                examples: [""]
            }
        }
    },
    validate(values) {
        console.log(values);
        let errors = {};
        let minWordLength = 2;

        if(!values.word) {
            errors.word = "Word is required";
        }
        else if(values.word.length < minWordLength) {
            errors.word = "Word's length cannot be less then " + minWordLength
        }

        return errors;
    },
    handleSubmit(values, {props, setSubmitting}) {
        if(props.mode === "add") {
            let data = {
                ...values,
                defs: values.defs.toString(),
                examples: values.examples.toString()
            }
            props.addWord(data)
                .then(() => {
                    props.onModalClose();
                })
                .catch(() => {
                    setSubmitting(false);
                });
        }
        else if(props.mode === "edit") {
            props.editWord({
                id: props.word.id,
                ...values
            })
                .then(() => {
                    props.onModalClose();
                })
                .catch(() => {
                    setSubmitting(false);
                });
        }
    }
})(WordsForm);