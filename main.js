let data = {
    firstName: 'John',
    lastName: 'Snow',
    age: 25
}

const observer = new Observer(data);
let newData = observer.data;

observer.observe('firstName', newVal => {
    console.log(`Oh no, first name was changed with ${newVal}`);
});

observer.observe('lastName', newVal => {
    console.log(`Yeah, last name was changed with ${newVal}`);
});

newData.firstName = "Hola";
newData.lastName = "No no no";

function Observer(dataObj) {
    let signals = {};

    observeData(dataObj);

    return {
        data: dataObj,
        observe,
        notify
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
}