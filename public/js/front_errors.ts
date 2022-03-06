import {goTo} from './utils/goTo.js';
import {playSound} from './utils/playSound.js';

const btn = document.querySelector('#approve') as HTMLButtonElement;
const click: HTMLAudioElement = new Audio('../audio/clicks/click.mp3');

btn.addEventListener('click', () => {
    playSound(click)
    goTo('/home', 1300);
});
