import {Warrior} from './class_Warrior';
import {getRandomIntInclusive} from '../utils/getRandomIntInclusive';
import {FightStats} from '../interfaces/interface_FightStats';

export class Arena {

    constructor(
        private warrior1: Warrior,
        private warrior2: Warrior,
        private activeWarrior: number = getRandomIntInclusive(1, 2),
    ) {
    }

    public figth() {

        let warrior1Hp: number = this.warrior1.endurance * 10;
        let warrior1Shield: number = this.warrior1.defence;

        let warrior2Hp: number = this.warrior2.endurance * 10;
        let warrior2Shield: number = this.warrior2.defence;

        //help-vars for return:
        let prevHp: number;
        let prevShield: number;

        let winner: Warrior | null = null;

        let stats: FightStats[] = [];

        const round = () => {

            const attacker: Warrior = this.activeWarrior === 1 ? this.warrior1 : this.warrior2;
            const attacked: Warrior = this.activeWarrior === 1 ? this.warrior2 : this.warrior1;

            // !fight_logic:
            if (attacked === this.warrior1) {
                if (warrior1Shield > attacker.strength) {
                    warrior1Shield -= attacker.strength;
                }

                if (warrior1Shield <= attacker.strength) {
                    prevHp = warrior1Hp;
                    prevShield = warrior1Shield
                    warrior1Hp -= (attacker.strength - warrior1Shield);
                    warrior1Shield = 0;
                }
            } else if (attacked === this.warrior2) {
                if (warrior2Shield > attacker.strength) {
                    warrior2Shield -= attacker.strength;
                }

                if (warrior2Shield <= attacker.strength) {
                    prevHp = warrior2Hp;
                    prevShield = warrior2Shield;
                    warrior2Hp -= (attacker.strength - warrior2Shield);
                    warrior2Shield = 0;
                }
            }

            // !check if win:
            if (warrior1Hp <= 0 || warrior2Hp <= 0) {
                winner = attacker;
            }

            // !next round:
            this.activeWarrior = this.activeWarrior === 1 ? 2 : 1;

            // !update round stats:
            const round: FightStats = {
                attackerName: attacker.name,
                attackerStrength: attacker.strength ?? 0,
                attackedName: attacked.name,
                attackedPrevShield: prevShield ?? 0,
                attackedActShield: attacked === this.warrior1 ? warrior1Shield : warrior2Shield,
                attackedPrevHp: prevHp,
                attackedActHp: attacked === this.warrior1 ? warrior1Hp : warrior2Hp,
                winner,
            }
            stats.push(round);
        }

        do {
            round();
        } while (!winner);

        return stats;
    }
}