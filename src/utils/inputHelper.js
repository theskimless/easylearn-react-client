export default function(obj) {
    function validate() {
        let isValid = true;
        for(let key in obj) {
            let isInputValid = obj[key].validate();
            if(isValid && !isInputValid) isValid = false;
        }
        return isValid;
    }
    for(let key in obj) {
        obj[key].bind["name"] = key;
    }
    return [obj, validate];
}