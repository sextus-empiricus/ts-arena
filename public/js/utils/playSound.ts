export const playSound = (sound: HTMLAudioElement) => {
    sound.load();
    const soundClone = sound.cloneNode() as HTMLAudioElement;
    soundClone.volume = .7;
    soundClone.play().then();
}