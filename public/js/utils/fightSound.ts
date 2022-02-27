import {playSound} from './playSound.js';

const hit1: HTMLAudioElement = new Audio('../../audio/fight/hit_1.mp3');
const hit2: HTMLAudioElement = new Audio('../../audio/fight/hit_2.mp3');
const hit3: HTMLAudioElement = new Audio('../../audio/fight/hit_3.wav');
const hit4: HTMLAudioElement = new Audio('../../audio/fight/hit_4.wav');
const hit5: HTMLAudioElement = new Audio('../../audio/fight/hit_5.wav');

const voice1: HTMLAudioElement = new Audio('../../audio/fight/voice_1.wav');
const voice2: HTMLAudioElement = new Audio('../../audio/fight/voice_2.wav');
const voice3: HTMLAudioElement = new Audio('../../audio/fight/voice_3.wav');
const voice4: HTMLAudioElement = new Audio('../../audio/fight/voice_4.wav');
const voice5: HTMLAudioElement = (new Audio('../../audio/fight/voice_5.wav'));

const hitsArr: HTMLAudioElement[] = [hit1, hit2, hit3, hit4, hit5];
const voicesArr: HTMLAudioElement[] = [voice1, voice2, voice3, voice4, voice5];

export const fightSound = () => {
    const idHit: number = Math.floor(Math.random() * (5))
    const idVoice: number = Math.floor(Math.random() * (5))

    playSound(hitsArr[idHit])
    setTimeout(()=> {
        playSound(voicesArr[idVoice])
    },150)
}