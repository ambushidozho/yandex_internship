function isUnique(arr, credentials) {
    let result = true;
    arr.forEach(function (item) {
        if (item.login === credentials.login && item.password === credentials.password) {
            result = false;
        }
    });
    return result;
}

function isValid(credentials) {
    if ((typeof credentials.login === 'string' || credentials.login instanceof String) &&
        (typeof credentials.password === 'string' || credentials.password instanceof String) &&
        (typeof credentials.date === 'object')) {
        return true;
    }
    return false;
}

function formatDate(date) {
    let str = date.getFullYear();
    str += '-';
    str += date.getMonth() + 1;
    str += '-';
    if (date.getDate() < 10) {
        str += '0';
    }
    str += date.getDate();
    return str;
}

function metrikaWrapper(func) {
    let users = [];
    let arr = [];
    return function (credentials, ...args) {
        if (!isValid(credentials) || !isUnique(users, credentials)) {
            return arr;
        }
        users.push(credentials);
        arr.length === 0 
        ? arr.push({ date: formatDate(credentials.date), users: 1 }) 
        : arr.forEach(function (item) {
            item.date === formatDate(credentials.date) ? item.users += 1 : arr.push({ date: formatDate(credentials.date), users: 1 })
        });
        func(...args);
        return arr;
    };
}

const wrapperFunc = metrikaWrapper(() => (console.log('called')));

console.log(wrapperFunc({ login: 'test', password: 'test', date: new Date('2019-01-01') }));

console.log(wrapperFunc({ login: NaN, password: 'a', date: new Date('2019-01-01') }));

console.log(wrapperFunc({ login: "c", date: new Date('2019-01-01') }));

console.log(wrapperFunc({ login: 'a', password: 'a', date: new Date('2019-01-01') }));

console.log(wrapperFunc({ login: 'b', password: 'b', date: new Date('2019-01-01') }));

console.log(wrapperFunc({ login: 'c', password: 'c', date: new Date('2019-01-01') }));

console.log(wrapperFunc({ login: 'c', password: 'c', date: new Date('2019-01-01') }));

console.log(wrapperFunc({ login: 'd', password: 'd', date: new Date('2019-01-02') }));
