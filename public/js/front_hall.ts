//  #imports:
import {createCreatingWarriorLog} from './create_elements.js';
import {goTo} from './utils/goTo.js';
import { playSound } from './utils/playSound.js';

//  #elements:
const createForm: HTMLElement = document.getElementById('create-form');
//  #inputs:
const inName = document.getElementById('input-name') as HTMLInputElement;
const inStrength = document.getElementById('input-strength') as HTMLInputElement;
const inAgility = document.getElementById('input-agility') as HTMLInputElement;
const inEndurance = document.getElementById('input-endurance') as HTMLInputElement;
const inDefence = document.getElementById('input-defence') as HTMLInputElement;
const inPassword = document.getElementById('input-password') as HTMLInputElement;

//  #list-elements:
const warriors = [...document.querySelectorAll('.warrior-element')] as HTMLElement[];
//  #btns:
const deleteBtns: NodeList = document.querySelectorAll('.delete-button');
const fightBtn: HTMLButtonElement = document.querySelector('#fight-btn');

//  #audio:
const errorSound: HTMLAudioElement = new Audio('../audio/clicks/error.mp3');
const clickSound: HTMLAudioElement = new Audio('../audio/clicks/click.mp3');
const checkedSound: HTMLAudioElement = new Audio('../audio/clicks/checked.mp3');

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
        const clickedBtn = e.target as HTMLButtonElement;
        const id: string = (clickedBtn.parentNode.parentNode as HTMLElement).dataset.id;

        const password: string = prompt('Please proviade a password to delete.')
        try {
            // @ts-ignore
            await axios({
                method: 'delete',
                url: `/api/v1/warriors/${id}`,
                data: {password}
            })
            playSound(clickSound);
            createCreatingWarriorLog('Deleted! Page refreshing.');
            goTo('/hall', 1500);
        } catch (err) {
            playSound(errorSound);
            createCreatingWarriorLog(err.response.data.message)
        }
    })
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
    goTo('/arena', 1000);
})