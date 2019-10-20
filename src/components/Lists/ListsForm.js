import React from "react";
import Modal from "../Modal/Modal";
import {withFormik, Form, Field, FieldArray} from "formik";

const ListsForm = props => {
    return (
        <Modal title={props.mode + " list"} messages={props.messages} onClose={props.onModalClose}>
            <Form>
                {/* NAME */}
                <div className="form-field">
                    <div className="form-field__title">Name</div>
                    {props.errors.name && <div className="form-field__error">{props.errors.name}</div>}
                    <Field type="text" name="name" />
                </div>

                {
                    props.mode === "edit" &&
                    <FieldArray name="words" render={arrayHelpers => 
                        arrayHelpers.form.values.words.length !== 0 &&
                        arrayHelpers.form.values.words.map((word, key) => 
                            <div className="form-field__array form-field__inp_m" key={key}>
                                <div className="form-field__array__item">
                                    <Field name={"words." + key} type="hidden" value={word.id} />
                                    {word.name}
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="round-btn minus-btn form-field__array__btn" 
                                        onClick={() => arrayHelpers.remove(key)}
                                    ></button>
                                </div>
                            </div>
                        )
                    } />
                }

                {/* SUBMIT */}
                <div className="text-center">
                    <button 
                        type="submit" 
                        className="button"
                        // disabled={props.isSubmitting}
                    >
                        {props.mode[0].toUpperCase() + props.mode.slice(1) + " list"}
                    </button>
                </div>
            </Form>
        </Modal>
    );
};

export default withFormik({
    mapPropsToValues({mode, list}) {
        if(mode === "edit") {
            return {
                name: list.name || "",
                words: list.words.map(word => (
                    {
                        id: word.id,
                        name: word.name
                    }
                )) || []
            };
        }
        else {
            return  {
                name: ""
            };
        }
    },
    validate(values) {
        let minNameLength = 2;
        let errors = {};
        
        if(!values.name) {
            errors.name = "List's name is required";
        }
        else if(values.name.length < minNameLength) {
            errors.name = "List's length cannot be less then " + minNameLength
        }

        return errors;
    },
    handleSubmit(values, {props, setSubmitting}) {
        if(props.mode === "add") {
            props.addList(values)
            .then(() => {
                props.onModalClose();
            })
            .catch(() => {
                setSubmitting(false);
            });
        }
        else if(props.mode === "edit") {
            let data = {
                id: props.list.id,
                name: values.name,
                words: props.list.words.reduce((accum, word) => {
                    if(!values.words.find(item => item.id === word.id)) {
                        accum.push(word.id); 
                    }
                    return accum;
                }, []).toString()
            };
            console.log(data);
            props.editList({
                ...data
            })
            .then(() => {
                props.onModalClose();
            })
            .catch(() => {
                setSubmitting(false);
            });
        }
    }
})(ListsForm);