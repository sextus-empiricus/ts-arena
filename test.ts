const arr = [
    {
        name: 'A',
        age: 1
    },
    {
        name: 'B',
        age: 2
    },
    {
        name: 'C',
        age: 3
    },
    {
        name: 'D',
        age: 4
    },
]
const arr2: any = [];

arr.forEach((el, index) => {
    if (index % 2 === 0) {
        arr2.push(el.name);
    }
})

console.log(arr2);

