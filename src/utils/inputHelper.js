export default function(obj) {
    for(let key in obj) {
        obj[key].bind["name"] = key
    }
    return obj;
}