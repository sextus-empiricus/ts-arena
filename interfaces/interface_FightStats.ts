import {Warrior} from '../classes/class_Warrior';

export interface FightStats {
    attackerName: string,
    attackerStrength: number,
    attackedName: string
    attackedOldShield: number,
    attackedNewShield: number,
    attackedPrevdHp: number,
    attackedNewHp: number,
    winner: Warrior | null
}