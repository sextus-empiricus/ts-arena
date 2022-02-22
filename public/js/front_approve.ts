import {goTo} from './utils/goTo.js';

const btn = document.querySelector('#approve') as HTMLButtonElement;
const click: HTMLAudioElement = new Audio('../audio/clicks/click.mp3');

btn.addEventListener('click', () => {
    click.volume = 0.4;
    click.play().then(() => {
        goTo('/home', 1300);
    });
})
