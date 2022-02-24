export const playSoundtrack = (audioElement: HTMLAudioElement, autoplay: boolean, loop: boolean, volume: number, button: HTMLButtonElement) => {
    audioElement.autoplay = autoplay;
    audioElement.loop = loop;
    audioElement.volume = volume;
    const promise = audioElement.play();

    if (promise !== undefined) {
        promise.then(() => {
            button.classList.add('is-playing');
            //autoplay started;
        }).catch(err => {
            button.classList.add('jello-horizontal');
        });
    }
}