import {Warrior} from '../classes/class_Warrior';

export interface FightStats {
    attackerName: string,
    attackerStrength: number,
    attackedName: string
    attackedPrevShield: number,
    attackedActShield: number,
    attackedPrevHp: number,
    attackedActHp: number,
    winner: Warrior | null
}