
export const createCreatingWarriorLog: any = (msg: string) => {
    const box: HTMLElement = document.getElementById('log-box');
    const log: HTMLElement = document.createElement('p');
    const now = new Date().toLocaleTimeString()

    log.classList.add('hall');
    log.classList.add('log');
    log.textContent = `${now}: ${msg}`;

    box.appendChild(log);
    box.scrollTop = box.scrollHeight; //scroll to bottom;
}