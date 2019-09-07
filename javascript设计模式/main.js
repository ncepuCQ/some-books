function deepClone (obj) {
    const isArray = Array.isArray(obj); // Object.prototype.toString.call(param);
    const newObj = isArray ? [] : {};
    Object.keys(obj).map(item => {
        newObj[item] = typeof obj[item] === 'object' ? deepClone(obj[item]) : obj[item]; 
    });
    return newObj;
}