import {pool} from '../db';
import 'dotenv/config';
import {Warrior} from '../../classes/class_Warrior';
import {Interface_Warrior} from '../../interfaces/interface_Warrior';
import {MyError} from '../../classes/class_MyError';
import {hash, compare} from 'bcryptjs';

export class WarriorRecord extends Warrior {
    public readonly _id: string;
    public readonly _name: string;
    public readonly _strength: number;      // - siła,
    public readonly _agility: number;       // - zręczność,
    public readonly _defence: number;       // - obrona,
    public readonly _endurance: number;     // - wytrzymałość,
    public _wins: number;
    public readonly _createdAt: Date;
    public readonly _password: string;

    constructor(obj: Interface_Warrior) {
        super(obj);
    }

    private validate(): void {
        if (!((this._strength + this._agility + this._defence + this._endurance) === 10)) throw new MyError('The distribution of skill points must be equal 10.', 400);
        if (this._wins < 0) throw new MyError('Something get wrong. New character wins must be equal 0.', 400);
    }

    public async insertMe(): Promise<string> {
        this.validate();
        const passHash = await hash(String(this._password), 10);

        await pool.query(`INSERT INTO ${process.env.DB_TABLES_WARRIORS} VALUES (:id, :name, :strength, :agility, :defence, :endurance, DEFAULT, DEFAULT, :password);`, {
            id: this._id ?? 'DEFAULT',
            name: this._name,
            strength: this._strength,
            agility: this._agility,
            defence: this._defence,
            endurance: this._endurance,
            password: passHash
        });
        return this._id;
    }

    public async updateMe(): Promise<string> { // - the app foresees wins updates only;
        this.validate();
        await pool.execute(`UPDATE ${process.env.DB_TABLES_WARRIORS} SET wins = :wins WHERE id = :id;`, {
            id: this._id,
            wins: this._wins
        })
        return this._id;
    }

    public async deleteMe(): Promise<void> {
        await pool.query(`DELETE FROM ${process.env.DB_TABLES_WARRIORS} WHERE id = :id`, {
            id: this._id
        });
    }

    public static async getAll(): Promise<WarriorRecord[]> {
        const results = (await pool.query(`SELECT * FROM ${process.env.DB_TABLES_WARRIORS};`))[0];
        return results.map((el: any) => {
            return new WarriorRecord(el)
        })
    }

    public static async getRanking(): Promise<WarriorRecord[]> {
        const results = (await pool.query(`SELECT * FROM ${process.env.DB_TABLES_WARRIORS} ORDER BY wins DESC LIMIT 10`))[0];
        return results.map((el: any) => {
            return new WarriorRecord(el)
        })
    }

    public static async getOneById(id: string): Promise<WarriorRecord> {
        const [result] = (await pool.query(`SELECT * FROM ${process.env.DB_TABLES_WARRIORS} WHERE id = :id;`, {
            id,
        }))[0];
        return new WarriorRecord(result);
    }

    static async deleteOneById(id: string): Promise<void> {
        await pool.query(`DELETE FROM ${process.env.DB_TABLES_WARRIORS} WHERE id = :id;`, {
            id,
        });
    }
}
