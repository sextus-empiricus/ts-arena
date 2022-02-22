export const fadeAudioOut = (audioElement: HTMLAudioElement) => {
    const myInterval: any = setInterval(() => {
        audioElement.volume -= 0.03;

        if (audioElement.volume <= 0.03) {
            audioElement.volume = 0;
            clearInterval(myInterval)
        }
    }, 30);
}