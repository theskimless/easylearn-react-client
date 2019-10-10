import {useState, useEffect} from "react";

export default (initialValue, callback) => {
    // let [value, setValue] = useState(initialValue);
    // let [errors, setErrors] = useState([]);

    // useEffect(() => {
    //     console.log("USE EFFECT", value);
    // }, [value]);
    // console.log("WHYYY", initialValue);
    // console.log("WHY", value);
    let value = initialValue;
    let errors = [];

    function setValue(val) {
        data.value = val;
    }

    function setErrors(val) {
        data.errors = val;
    }

    let data = {
        value,
        setValue,
        errors,
        validate: () => {
            if(callback) {
                let errors = callback(value);
                setErrors(errors);
                if(errors.length !== 0) return false;
            }
            return true;
        },
        bind: {
            value: value,
            onChange: e => {
                setValue(e.target.value)
                if(callback) setErrors(callback(e.target.value));
            }
        }
    }

    return data;
}