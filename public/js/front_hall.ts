//  #imports:
import {createCreatingWarriorLog} from './create_elements.js';
import {goTo} from './utils/goTo.js';

//  #vars:
const createForm: HTMLElement = document.getElementById('create-form');
//  #inputs:
const inName = document.getElementById('input-name') as HTMLInputElement;
const inStrength = document.getElementById('input-strength') as HTMLInputElement;
const inAgility = document.getElementById('input-agility') as HTMLInputElement;
const inEndurance = document.getElementById('input-endurance') as HTMLInputElement;
const inDefence = document.getElementById('input-defence') as HTMLInputElement;
//  #list-elements:
const warriors = [...document.querySelectorAll('.warrior-element')] as HTMLElement[];
//  #btns:
const deleteBtns: NodeList = document.querySelectorAll('.delete-button');
const fightBtn: HTMLButtonElement = document.querySelector('#fight-btn');

//  #listener checked-fucionality:
warriors.forEach((el: HTMLElement) => {
    el.addEventListener('click', e => {
        if (el.dataset.checked === 'false') {
            el.dataset.checked = 'true';
            el.classList.add('checked');
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
    try {
        // @ts-ignore
        const resp = await axios({
            method: 'post',
            url: '/api/v1/warriors',
            data: {
                name,
                strength,
                agility,
                endurance,
                defence
            }
        });

        createCreatingWarriorLog('Success! Page refresing.');
        goTo('/hall', 1500);

    } catch (err) {
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
        const nowTimestamp: number = new Date().getTime();
        const clickedBtn = e.target as HTMLButtonElement;
        const id: string = (clickedBtn.parentNode.parentNode as HTMLElement).dataset.id;

        try {
            // @ts-ignore
            const createdAtTimestamp: Promise<number> = new Date((await axios({
                method: 'get',
                url: `/api/v1/warriors/${id}`,
            })).data.data._createdAt).getTime();

            const diff: number = ((Number(nowTimestamp) - Number(createdAtTimestamp)) / 1000);

            if (diff < 86400) return createCreatingWarriorLog('Can not delete a warrior before 24 hours since it was created.');
            const confirm = prompt('Please type "kill" to provide.');
            if (confirm !== 'kill') return createCreatingWarriorLog('Deleting canceled.');

            // @ts-ignore
            await axios({
                method: 'delete',
                url: `/api/v1/warriors/${id}`,
            })

            createCreatingWarriorLog('Deleted! Page refreshing.');
            goTo('/hall', 1500);
        } catch (err) {
            createCreatingWarriorLog('Something get wrong.')
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

    if (checkedElements.length !== 2) return createCreatingWarriorLog('Please choose two warriors.');

    checkedElements.forEach((el: HTMLElement) => {
        warriorsArena.push(el.dataset.id as string)
    })

    document.cookie = `warriorsArena=${JSON.stringify(warriorsArena)}`
    goTo('/arena', 500);
})