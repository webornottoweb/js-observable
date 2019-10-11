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
            notify(key, newVal);
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

let signals = {};

function observe(property, callback) {
    if (!signals[property]) {
        signals[property] = [];
    }

    signals[property].push(callback);
}

function notify(signal, newVal) {
    if (!signals[signal] || signals[signal].length < 1) {
        return;
    }

    signals[signal].forEach(callback => callback(newVal));
}

observe('firstName', newVal => {
    console.log(`Oh no, first name was changed with ${newVal}`);
});

observe('lastName', newVal => {
    console.log(`Yeah, last name was changed with ${newVal}`);
});

data.firstName = 'New';
data.lastName = 'New1';