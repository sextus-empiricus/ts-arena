import {v4 as uuid} from 'uuid';
import {Interface_Warrior} from '../interfaces/interface_Warrior';

export class Warrior {
    public readonly _id: string;
    public readonly _name: string;
    public readonly _strength: number;      // - siła,
    public readonly _agility: number;       // - zręczność,
    public readonly _defence: number;       // - obrona,
    public readonly _endurance: number;     // - wytrzymałość,
    public _wins: number;

    constructor(obj: Interface_Warrior) {
        this._id = obj.id ?? uuid();
        this._name = obj.name;
        this._strength = obj.strength;
        this._agility = obj.agility;
        this._defence = obj.defence;
        this._endurance = obj.endurance;
        this._wins = obj.wins ?? 0;
    }

    public get name(): string {
        return this._name;
    }

    public get strength(): number {
        return this._strength;
    }

    public get agility(): number {
        return this._agility;
    }

    public get defence(): number {
        return this._defence;
    }

    public get endurance(): number {
        return this._endurance;
    }

    public get wins(): number {
        return this._wins;
    }

    public set wins(value: number) {
        this._wins = value
    }
}