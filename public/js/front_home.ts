import {goTo} from './utils/goTo.js';
import {fadeAudioOut} from './utils/fadeAudioOut.js';
import {playSound} from './utils/playSound.js';
import {playSoundtrack} from './utils/playSoundtrack.js';
import {btnAudioFun} from './utils/btnAudio.js';

const errorSound: HTMLAudioElement = new Audio('../audio/clicks/prev_kill.wav');
const checkedSound: HTMLAudioElement = new Audio('../audio/clicks/checked.mp3');
const homeTheme: HTMLAudioElement = new Audio('../audio/home_theme.mp3');
const btnStart = document.querySelector('#btn-start') as HTMLButtonElement;
const btnAudio = document.querySelector('#audioBtn') as HTMLButtonElement;
const story = document.querySelector('.story-text') as HTMLParagraphElement;

let topValue: number = 0;

const stopAudio = (audioElement: HTMLAudioElement) => {
    fadeAudioOut(audioElement)
    audioElement.pause();
}

const scrollStory = () => {
    const id = setInterval(() => {
        story.style.top = `${topValue}px`
        topValue = topValue - 1;
    }, 50)
}

//  #start funkctions:
playSoundtrack(homeTheme, true,true,1, btnAudio)
scrollStory();

//  #listeners:
btnStart.addEventListener('click', () => {
    playSound(checkedSound);
    fadeAudioOut(homeTheme);
    goTo('/hall', 1000);
})
//  #button audio play:
btnAudio.addEventListener('click', ()=> {
    btnAudioFun(btnAudio, errorSound, homeTheme)
})