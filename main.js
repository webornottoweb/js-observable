let data = {
    firstName: 'Jon',
    lastName: 'Snow',
    age: 25
}

function makeReactive(obj, key) {
    let val = obj[key];

    Object.defineProperty(obj, key, {
        get() {
            return val;
        },
        set(newVal) {
            val = newVal;
            console.log(newVal);
            // notify(newVal);
        }
    });
}

function observeData(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            makeReactive(obj, key);
        }
    }
}

observeData(data);
data.age = 26;
data.firstName = 'Andrey';
console.log(data.age, data.firstName);