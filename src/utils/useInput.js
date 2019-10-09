import {useState} from "react";

export default (initialValue, callback) => {
    let [value, setValue] = useState(initialValue);
    let [errors, setErrors] = useState([]);

    return {
        value,
        setValue,
        errors,
        validate: () => callback && setErrors(callback(value)),
        bind: {
            onChange: e => {
                setValue(e.target.value)
                if(callback) setErrors(callback(e.target.value));
            }
        }
    }
}