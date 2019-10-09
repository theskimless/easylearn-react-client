export default function(obj) {
    // let isValid = true;
    function validate() {
        for(let key in obj) {
            obj[key].validate();
            console.log(obj[key]);
        }
    }
    for(let key in obj) {
        obj[key].bind["name"] = key;
        // isValid = isValid && obj[key].errors.length === 0;
    }
    return [obj, validate];
}