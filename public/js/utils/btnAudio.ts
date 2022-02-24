import {playSound} from './playSound.js';
import {playSoundtrack} from './playSoundtrack.js';

export const btnAudioFun = (btn: HTMLButtonElement, errorSound: HTMLAudioElement, theme: HTMLAudioElement) => {
    if ([...btn.classList].includes('is-playing')) {
        playSound(errorSound);
        theme.pause();
        theme.currentTime = 0;
        btn.classList.remove('is-playing');
    } else {
        // playSound(clickSound);
        playSoundtrack(theme, true, true, 1, btn)
        btn.classList.add('is-playing')
    }
};