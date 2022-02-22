import {goTo} from './utils/goTo.js';
import {fadeAudioOut} from './utils/fadeAudioOut.js';
import {playSound} from './utils/playSound.js';

const clickSound: HTMLAudioElement = new Audio('../audio/clicks/click.mp3');
const errorSound: HTMLAudioElement = new Audio('../audio/clicks/error.mp3');
const homeTheme: HTMLAudioElement = new Audio('../audio/home_theme.mp3');
const btnStart = document.querySelector('#btn-start') as HTMLButtonElement;
const btnAudio = document.querySelector('#audioBtn') as HTMLButtonElement;
const story = document.querySelector('.story-text') as HTMLParagraphElement;

let topValue: number = 0;

//# function delarations:
const playAudio = (audioElement: HTMLAudioElement, autoplay: boolean, loop: boolean, volume: number) => {
    audioElement.autoplay = autoplay;
    audioElement.loop = loop;
    audioElement.volume = volume;
    const promise = audioElement.play();

    if (promise !== undefined) {
        promise.then(() => {
            btnAudio.classList.add('is-playing');
            //autoplay started;
        }).catch(err => {
            btnAudio.classList.add('jello-horizontal');
        });
    }
}

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
playAudio(homeTheme, true, true, 1);
scrollStory();

//  #listeners:
btnStart.addEventListener('click', () => {
    playSound(clickSound);
    fadeAudioOut(homeTheme);
    goTo('/hall', 1000);
})

btnAudio.addEventListener('click', ()=> {
    if([...btnAudio.classList].includes('is-playing')) {
        playSound(errorSound);
        homeTheme.pause();
        homeTheme.currentTime = 0;
        btnAudio.classList.remove('is-playing');
    } else {
        // playSound(clickSound);
        playAudio(homeTheme, true, true, 1);
        btnAudio.classList.add('is-playing')
    }
})