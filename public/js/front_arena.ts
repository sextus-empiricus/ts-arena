//  #imports:
import {fightSound} from './utils/fightSound.js';
import {playSoundtrack} from './utils/playSoundtrack.js';
import {ProgressBar} from './utils/class_hpBar.js';
import {getCookie} from './utils/cookies.js';
import {fadeAudioOut} from './utils/fadeAudioOut.js';

//# warriors box elements:
const warrior1Box: HTMLElement = document.querySelector('#warrior1');
const warrior2Box: HTMLElement = document.querySelector('#warrior2');

//# final windows elements:
const finalShadow: HTMLElement = document.querySelector('.final-window-shadow');
const finalWindowBox: HTMLElement = document.querySelector('.final-window-box');

//# warriors hp bars:
const warrior1progressBar: HTMLDivElement = document.querySelector('#progress-bar-warrior-1')
const warrior2progressBar: HTMLDivElement = document.querySelector('#progress-bar-warrior-2')

const warrior1MaxHp: number = Number(getCookie('warrior1-hp'));
const warrior1Strength: number = Number(getCookie('warrior1-strength'));
const warrior2MaxHp: number = Number(getCookie('warrior2-hp'));
const warrior2Strength: number = Number(getCookie('warrior2-strength'));

const w1pg: ProgressBar = new ProgressBar(warrior1progressBar, warrior1MaxHp);
const w2pg: ProgressBar = new ProgressBar(warrior2progressBar, warrior2MaxHp);

//  #audio:
const btnAudio = document.querySelector('#audioBtn') as HTMLButtonElement;
const arenaTheme: HTMLAudioElement = new Audio('../audio/arena_theme.mp3');
const finalTheme: HTMLAudioElement = new Audio('../audio/final_theme.mp3');

//  #console elements:
const statsElements = [...document.querySelectorAll('.log')] as HTMLElement[];
const listBox = document.querySelector('.list-box') as HTMLElement;
const winnerElement = document.querySelector('.winner-element') as HTMLElement;

//  #on page-load:
playSoundtrack(arenaTheme, true, true, 1, btnAudio)

//  #helper variables:
let elementId: number = 0;
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
            w2pg.hit(warrior1Strength);
            warrior1Box.classList.add('attack-down');
            warrior2Box.classList.add('defence-down');
            turnFlag = turnFlag === 0 ? 1 : 0;
        } else {
            w1pg.hit(warrior2Strength);
            warrior1Box.classList.add('defence-up');
            warrior2Box.classList.add('attack-up');
            turnFlag = turnFlag === 0 ? 1 : 0;
        }

    } else {
        // if box2 starts:
        if (turnFlag === 0) {
            w1pg.hit(warrior2Strength);
            warrior1Box.classList.add('defence-up');
            warrior2Box.classList.add('attack-up');
            turnFlag = turnFlag === 0 ? 1 : 0;
        } else {
            w2pg.hit(warrior1Strength);
            warrior1Box.classList.add('attack-down');
            warrior2Box.classList.add('defence-down');
            turnFlag = turnFlag === 0 ? 1 : 0;
        }
    }

    statsElements[elementId].hidden = false;
    statsElements[elementId].classList.add();

    elementId += 1;

    //# action on the end of consoling:
    if (elementId === statsElements.length) {
        clearInterval(intervalId);

        winnerElement.hidden = false;

        playSoundtrack(finalTheme, true, true, 1, btnAudio);
        fadeAudioOut(arenaTheme);

        setTimeout(() => {
            // finalShadow.style.display = 'flex';
            // finalWindowBox.style.display = 'flex';
        }, 1000)
    }

    listBox.scroll({
        behavior: 'smooth',
        left: 0,
        top: listBox.scrollHeight
    })
    setTimeout(() => {
        warrior1Box.classList.remove('attack-down', 'defence-up');
        warrior2Box.classList.remove('attack-up', 'defence-down');
    }, 750)


}, 800);
/////////////////////////////notes//////////////////////////////


