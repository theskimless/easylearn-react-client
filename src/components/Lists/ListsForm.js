import React from "react";
import Modal from "../Modal/Modal";
import {withFormik, Form, Field} from "formik";

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

                {/* SUBMIT */}
                <div className="text-center">
                    <button 
                        type="submit" 
                        className="button"
                        disabled={props.isSubmitting}>
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
                name: list.name || ""
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
            props.editList({
                id: props.list.id,
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
})(ListsForm);