export const playSound = (sound: HTMLAudioElement) => {
    // if (sound.preload !== 'auto') {
    //     sound.preload = 'auto';
        sound.load();
    // }
    const soundClone = sound.cloneNode() as HTMLAudioElement;
    soundClone.play().then();
}