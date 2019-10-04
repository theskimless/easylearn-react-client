import {useState} from "react";

export default (initialValue) => {
    let [value, setValue] = useState(initialValue);

    return {
        value,
        setValue,
        bind: {
            onChange: e => {
                setValue(e.target.value)
            }
        }
    }
}