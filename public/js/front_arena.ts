console.log('test');

const statsElements = [...document.querySelectorAll('.log')] as HTMLElement[];
const listBox = document.querySelector('.list-box') as HTMLElement;
const winnerElement = document.querySelector('.winner-element') as HTMLElement;
let elementsId: number = 0;

const intervalId = setInterval(() => {
    statsElements[elementsId].hidden = false;
    elementsId += 1;
    if (elementsId === statsElements.length) {
        clearInterval(intervalId);
        winnerElement.hidden = false;
    }
    listBox.scrollTop = listBox.scrollHeight; //scroll to bottom;
}, 500);



