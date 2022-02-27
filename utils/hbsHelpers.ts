export const hbsHelpers = {

    roundNumber: (el: number) => {
        return el + 1
    },

    turnOf: (el: number) => {
        if (el % 2 !== 0) {
            return 'warrior-2';
        } else {
            return 'warrior-1'
        }
    }
}