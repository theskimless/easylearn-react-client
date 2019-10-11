import {useState, useEffect} from "react";

export default (initialValue, callback) => {
    let [value, setValue] = useState(initialValue);
    let [errors, setErrors] = useState([]);

    useEffect(() => {
        data.errors = errors;
    }, [errors]);

    let data = {
        value,
        setValue,
        errors,
        validate: () => {
            if(callback) {
                setErrors(callback(value));
                if(errors.length !== 0) return false;
            }
            return true;
        },
        bind: {
            value,
            onChange: e => {
                setValue(e.target.value)
                if(callback) setErrors(callback(e.target.value));
            }
        }
    }

    return data;
}