import {Warrior} from '../classes/class_Warrior';

export interface FightStats {
    attackerName: string,
    attackerHit: number,
    attackedName: string
    attackedPrevHp: number,
    attackedActHp: number,
    winner: Warrior | null
}