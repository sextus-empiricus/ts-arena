//  #imports:
import {playSoundtrack} from './utils/playSoundtrack.js';
import {ProgressBar} from './utils/class_hpBar.js';
import {deleteCookies, getCookie} from './utils/cookies.js';
import {fadeAudioOut} from './utils/fadeAudioOut.js';
import {goTo} from './utils/goTo.js';
import {playSound} from './utils/playSound.js';
import {btnAudioFun} from './utils/btnAudio.js';
import {fightSound} from './utils/fightSound.js';

//  #warriors box elements:
const warrior1Box: HTMLElement = document.querySelector('#warrior1');
const warrior2Box: HTMLElement = document.querySelector('#warrior2');

//  #background img warriors:
const warrior1Img: HTMLImageElement = document.querySelector('#bg-img-warrior1')
const warrior2Img: HTMLImageElement = document.querySelector('#bg-img-warrior2')

//  #final windows elements:
const finalShadow: HTMLElement = document.querySelector('.final-window-shadow');
const finalWindowBox: HTMLElement = document.querySelector('.final-window-box');

//  #warriors hp bars:
const warrior1progressBar: HTMLDivElement = document.querySelector('#progress-bar-warrior-1')
const warrior2progressBar: HTMLDivElement = document.querySelector('#progress-bar-warrior-2')

const warrior1MaxHp: number = Number(getCookie('warrior1-hp'));
const warrior2MaxHp: number = Number(getCookie('warrior2-hp'));

const warrior1Hits: number[] = JSON.parse(decodeURIComponent(getCookie('warrior1-hits'))); // - first attacker;
const warrior2Hits: number[] = JSON.parse(decodeURIComponent(getCookie('warrior2-hits')));

const w1pg: ProgressBar = new ProgressBar(warrior1progressBar, warrior1MaxHp);
const w2pg: ProgressBar = new ProgressBar(warrior2progressBar, warrior2MaxHp);

//  #audio:
const btnAudio = document.querySelector('#audioBtn') as HTMLButtonElement;
const closeSound: HTMLAudioElement = new Audio('../audio/clicks/close.wav');
const checkedSound: HTMLAudioElement = new Audio('../audio/clicks/checked.mp3');
const arenaTheme: HTMLAudioElement = new Audio('../audio/arena_theme.mp3');
const finalTheme: HTMLAudioElement = new Audio('../audio/final_theme.mp3');

//  #console elements:
const statsElements = [...document.querySelectorAll('.log')] as HTMLElement[];
const listBox = document.querySelector('.list-box') as HTMLElement;
const winnerElement = document.querySelector('.winner-element') as HTMLElement;

//  #buttons:
const closeFinalWindowBtn = document.getElementById('close-final-box');
const backToHallBtn = document.getElementById('go-to-hall-btn');
const backToHallBtn2 = document.getElementById('back-to-hall-btn2');

//  #functions:
const backToHall = () => {
    playSound(checkedSound)
    fadeAudioOut(finalTheme);
    goTo('/hall', 1000);
}

//  #on page-load:
playSoundtrack(arenaTheme, true, true, 1, btnAudio)

//  #helper variables:
let elementId: number = 0;
let hitArrId1: number = 0;
let hitArrId2: number = 0;
let startingFlag: number = 0; // if 0 - box1 starts | if 1 - box2 start;
let turnFlag: number = 0;

//  #elements animation:
const intervalId = setInterval(async () => {
    fightSound();

    const firstAttacker = statsElements[0].dataset.firstAttacker;
    startingFlag = warrior1Box.dataset.warriorName === firstAttacker ? 0 : 1;

    if (startingFlag === 0) {
        // if box1 starts:
        if (turnFlag === 0) {
            w2pg.hit(warrior1Hits[hitArrId1]);
            warrior1Box.classList.add('box-attack');
            warrior1Img.classList.add('attack-down');
            warrior2Box.classList.add('box-defence');
            warrior2Img.classList.add('defence-scale');
            turnFlag = turnFlag === 0 ? 1 : 0;
            hitArrId1++;
        } else {
            w1pg.hit(warrior2Hits[hitArrId2]);
            warrior1Box.classList.add('box-defence');
            warrior1Img.classList.add('defence-scale');
            warrior2Box.classList.add('box-attack');
            warrior2Img.classList.add('attack-up');
            turnFlag = turnFlag === 0 ? 1 : 0;
            hitArrId2++
        }
    } else {
        // if box2 starts:
        if (turnFlag === 0) {
            w1pg.hit(warrior1Hits[hitArrId1]);
            warrior1Box.classList.add('box-defence');
            warrior1Img.classList.add('defence-scale');
            warrior2Box.classList.add('box-attack');
            warrior2Img.classList.add('attack-up');
            turnFlag = turnFlag === 0 ? 1 : 0;
            hitArrId1++
        } else {
            w2pg.hit(warrior2Hits[hitArrId2]);
            warrior1Box.classList.add('box-attack');
            warrior1Img.classList.add('attack-down');
            warrior2Box.classList.add('box-defence');
            warrior2Img.classList.add('defence-scale');
            turnFlag = turnFlag === 0 ? 1 : 0;
            hitArrId2++;
        }
    }

    statsElements[elementId].hidden = false;
    elementId += 1;

    //# action on the end of consoling:
    if (elementId === statsElements.length) {

        clearInterval(intervalId);

        winnerElement.hidden = false;

        fadeAudioOut(arenaTheme);
        playSoundtrack(finalTheme, true, true, 1, btnAudio);
        deleteCookies(['warrior1-hits', 'warrior2-hits', 'warrior1-hp', 'warrior2-hp', 'warriorsArena']);

        setTimeout(() => {
            finalShadow.style.display = 'flex';
            finalWindowBox.style.display = 'flex';
        }, 1000)
    }

    listBox.scroll({
        behavior: 'smooth',
        left: 0,
        top: listBox.scrollHeight
    })
    setTimeout(() => {
        warrior1Box.classList.remove('box-attack', 'box-defence');
        warrior2Box.classList.remove('box-attack', 'box-defence');

        warrior1Img.classList.remove('attack-down', 'defence-scale');
        warrior2Img.classList.remove('attack-up', 'defence-scale');

    }, 750)
}, 800);

//  #buttons functions:
closeFinalWindowBtn.addEventListener('click', () => {
    playSound(closeSound);
    backToHallBtn2.style.visibility = 'visible';
    backToHallBtn.style.display = 'none';
    btnAudio.style.display = 'none';
    finalShadow.style.display = 'none';
    finalWindowBox.style.display = 'none';
});

backToHallBtn2.addEventListener('click', () => {
    backToHall();
})

backToHallBtn.addEventListener('click', () => {
    backToHall();
})

btnAudio.addEventListener('click', () => {
    btnAudioFun(btnAudio, closeSound, arenaTheme);
})


