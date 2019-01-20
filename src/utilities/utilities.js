//parse an object to array of properties
export function parseObjToArray(obj){
    let result = [];
    for(let prop in obj){
        result.push({
            key: prop,
            value: obj[prop]
        })
    }
    return result;
};