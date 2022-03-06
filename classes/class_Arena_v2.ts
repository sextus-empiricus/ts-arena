import {Warrior} from './class_Warrior';
import {getRandomIntInclusive} from '../utils/getRandomIntInclusive';
import {FightStats} from '../interfaces/interface_FightStats';

export class ArenaV2 {

    constructor(
        private warrior1: Warrior,
        private warrior2: Warrior,
        private activeWarrior: number = getRandomIntInclusive(1, 2),
    ) {
    }

    public figth() {

        let warrior1Hp: number = (this.warrior1.endurance + this.warrior1.defence) * 10 + 1;
        let warrior2Hp: number = (this.warrior2.endurance + this.warrior2.defence) * 10 + 1;

        //help-vars for return:
        let prevHp: number;
        let hitPower: number;
        let winner: Warrior | null = null;
        let stats: FightStats[] = [];

        const round = () => {

            const attacker: Warrior = this.activeWarrior === 1 ? this.warrior1 : this.warrior2;
            const attacked: Warrior = this.activeWarrior === 1 ? this.warrior2 : this.warrior1;
            const luck = () => {
                const random: number = getRandomIntInclusive(1, 100);
                if (random > 80) {
                    return 2
                }
                if (random < 20) {
                    return -2
                }
                return 0
            }

            // !fight_logic:
            if (attacked === this.warrior1) {
                const luckPoints = luck();
                prevHp = warrior1Hp;
                hitPower = attacker.strength + attacker.agility + luckPoints + 1 <= 0 ? 0 : attacker.strength + attacker.agility + luckPoints + 1;
                warrior1Hp -= hitPower;

            } else if (attacked === this.warrior2) {
                const luckPoints = luck();
                prevHp = warrior2Hp;
                hitPower = attacker.strength + attacker.agility + luckPoints + 1 <= 0 ? 0 : attacker.strength + attacker.agility + luckPoints + 1;

                warrior2Hp -= hitPower;
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
                attackerHit: hitPower,
                attackedName: attacked.name,
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