function Sort(array, field) {
    if(field) {
        array.sort(function (a, b) {
            if (a[field] > b[field]) {
              return 1;
            }
            if (a[field] < b[field]) {
              return -1;
            }
            return 0;
          });
    } else {
        switch (typeof array[0]) {
            case 'number':
                array.sort((a, b) => {
                    return a - b;
                });
                break;
            case 'string':
                array.sort();
                break;
        }
    }
    return array;
}

function usualOrderSort(array, order, field) {
    let result = [];
    let buff = [];
    result.length = order.length;
    let template = new Map();
    let i = 0;
    order.forEach(element => {
        template.set(element, i++);
    });
    array.forEach(element => {
        template.has(element) ? result[template.get(element)] = element : buff.push(element);
    });
    Sort(buff, field);
    result = result.concat(buff);
    return result;
}

const menu = {
    'a': 1,
    'b': 5,
    'c': 3
}
const header = {
    'a': 1,
    'b': 6,
    'c': 3
}
const content = {
    'a': 1,
    'b': 1,
    'c': 3
}
const album = {
    'a': 1,
    'b': 3,
    'c': 3
}
const artist = {
    'a': 1,
    'b': 6,
    'c': 3
}
order = [header, menu, content];
array = [content, header, menu, album, artist];

console.log(array = usualOrderSort(array, order, 'b'));






