//  #imports:
import {createCreatingWarriorLog} from './utils/create_elements.js';
import {goTo} from './utils/goTo.js';
import {playSound} from './utils/playSound.js';
import {playSoundtrack} from './utils/playSoundtrack.js';
import {btnAudioFun} from './utils/btnAudio.js';
import {fadeAudioOut} from './utils/fadeAudioOut.js';

//  #elements:
const createForm: HTMLElement = document.getElementById('create-form');
const deletingShadow: HTMLElement = document.getElementById('deleting-shadow');
const deletingBox: HTMLElement = document.getElementById('deleting-box');

//  #inputs:
const inName = document.getElementById('input-name') as HTMLInputElement;
const inStrength = document.getElementById('input-strength') as HTMLInputElement;
const inAgility = document.getElementById('input-agility') as HTMLInputElement;
const inEndurance = document.getElementById('input-endurance') as HTMLInputElement;
const inDefence = document.getElementById('input-defence') as HTMLInputElement;
const inPassword = document.getElementById('input-password') as HTMLInputElement;
const inProvPass = document.getElementById('input-provide-password') as HTMLInputElement;

//  #list-elements:
const warriors = [...document.querySelectorAll('.warrior-element')] as HTMLElement[];

//  #btns:
const deleteBtns: NodeList = document.querySelectorAll('.delete-button');
const fightBtn: HTMLButtonElement = document.querySelector('#fight-btn');
const provDeleteBtn: HTMLButtonElement = document.querySelector('#provide-delete-button');
const closeDelBox: HTMLElement = document.getElementById('close-deleting-box');
const btnAudio = document.querySelector('#audioBtn') as HTMLButtonElement;

//  #audio:
const hallTheme: HTMLAudioElement = new Audio('../audio/hall_theme.mp3');
const errorSound: HTMLAudioElement = new Audio('../audio/clicks/error.mp3');
const clickSound: HTMLAudioElement = new Audio('../audio/clicks/click.mp3');
const checkedSound: HTMLAudioElement = new Audio('../audio/clicks/checked.mp3');
const killSound: HTMLAudioElement = new Audio('../audio/clicks/kill.mp3');
const closeSound: HTMLAudioElement = new Audio('../audio/clicks/close.wav');
const prevKillSound: HTMLAudioElement = new Audio('../audio/clicks/prev_kill.wav');

//  #on page-load:
inName.focus();
playSoundtrack(hallTheme, true,true,1, btnAudio)

//  #listeners' functions:
const deleteWarrior = async (id: string, password: string) => {
    try {
        // @ts-ignore
        await axios({
            method: 'delete',
            url: `/api/v1/warriors/${id}`,
            data: {password}
        })
        playSound(killSound);
        createCreatingWarriorLog('Deleted! Page refreshing.');
        goTo('/hall', 1000);
    } catch (err) {
        playSound(errorSound);
        createCreatingWarriorLog(err.response.data.message)
    }
}
const closeDeletingWin = () => {
    deletingShadow.style.display = 'none';
    deletingBox.style.display = 'none';
}

//  #listener checked-fucionality:
warriors.forEach((el: HTMLElement) => {
    el.addEventListener('click', () => {
        if (el.dataset.checked === 'false') {
            el.dataset.checked = 'true';
            el.classList.add('checked');
            playSound(checkedSound);
        } else {
            el.dataset.checked = 'false';
            el.classList.remove('checked');
        }
    })
})

//  #listener create:
createForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name: string = inName.value;
    const strength: number = Number(inStrength.value);
    const agility: number = Number(inAgility.value);
    const endurance: number = Number(inEndurance.value);
    const defence: number = Number(inDefence.value);
    const password: number = Number(inPassword.value);
    try {
        // @ts-ignore
        await axios({
            method: 'post',
            url: '/api/v1/warriors',
            data: {
                name,
                strength,
                agility,
                endurance,
                defence,
                password
            }
        });
        playSound(clickSound);
        createCreatingWarriorLog('Success! Page refresing.');
        fadeAudioOut(hallTheme);
        goTo('/hall', 1500);

    } catch (err) {
        playSound(errorSound);
        const {message} = err.response.data;
        if (message.includes('Duplicate entry')) {
            createCreatingWarriorLog('Chosen name is allready in use.');
            return;
        }
        if (message.includes('name_empty_string')) {
            createCreatingWarriorLog('The "name" property can not be empty.');
            return;
        }
        createCreatingWarriorLog(message);
    }
});

//  #listener deleteBtns:
deleteBtns.forEach(btn => {
    btn.addEventListener('click', async e => {
        e.stopPropagation();
        playSound(prevKillSound);

        const clickedBtn = e.target as HTMLButtonElement;
        clickedBtn.blur();
        provDeleteBtn.dataset.id = (clickedBtn.parentNode.parentNode as HTMLElement).dataset.id;

        let shadowOppasity: number = 0;
        deletingShadow.style.display = 'block';
        const shadowOpasityInterval = setInterval(() => {
            shadowOppasity += .05;
            deletingShadow.style.opacity = String(shadowOppasity);
            if (Number(deletingShadow.style.opacity) === 1) {
                clearInterval(shadowOpasityInterval)
            }
        }, 10)
        setTimeout(() => {
            deletingBox.style.display = 'flex';
            inProvPass.focus();
        }, 300)


    });
});

//  #provide deleteing button:
window.addEventListener('keydown', async (e: KeyboardEvent) => {
    if (deletingBox.style.display !== 'flex') return;
    if (e.key !== 'Enter') return;
    const id = (provDeleteBtn as HTMLButtonElement).dataset.id;
    const password: string = inProvPass.value;
    await deleteWarrior(id, password);
})
provDeleteBtn.addEventListener('click', async (e: MouseEvent) => {
    const id = (e.target as HTMLButtonElement).dataset.id;
    const password: string = inProvPass.value;
    await deleteWarrior(id, password);
})

//  #close deleting box:
window.addEventListener('keyup', e => {
    if (deletingBox.style.display !== 'flex') return;
    if (e.key !== 'Escape') return;
    playSound(closeSound);
    closeDeletingWin();
});
closeDelBox.addEventListener('click', () => {
    playSound(closeSound);
    closeDeletingWin();
});

//  #listener fightBtn:
fightBtn.addEventListener('click', async () => {
    const warriorsArena: any = [];
    const checkedElements = [...document.querySelectorAll('.warrior-element')]
        .filter((el: HTMLElement) => {
            return el.dataset.checked === 'true';
        });

    if (checkedElements.length !== 2) {
        playSound(errorSound)
        return createCreatingWarriorLog('Please choose two warriors.');
    }
    playSound(clickSound);
    checkedElements.forEach((el: HTMLElement) => {
        warriorsArena.push(el.dataset.id as string)
    })

    document.cookie = `warriorsArena=${JSON.stringify(warriorsArena)}`
    fadeAudioOut(hallTheme);
    goTo('/arena', 1000);
})

//  #button audio play:
btnAudio.addEventListener('click', ()=> {
    btnAudioFun(btnAudio, closeSound, hallTheme);
})