export const goTo = (url: string, time: number) => {
    setTimeout(()=>{
        window.location.assign(url);
    }, time)
}