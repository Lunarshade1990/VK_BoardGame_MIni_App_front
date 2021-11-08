export class EventTable {

    constructor(type, table) {
        if (table) {
            this.id = table.id;
        } else {
            this.id = null;
        }
        this.type = type;
    }

    plays = []
    static lastPlayId = 0;

    addPlay = (play) => {
        play.id = ++EventTable.lastPlayId;
        this.plays.push(play);
        return play.id;
    }

    getPlayById = (id) => {
        return this.plays.filter(play => play.id === id)[0];
    }

    removePlayById = (id) => {
        let playIdx = -1;
        this.plays.forEach((play, idx) => {
            if (play.id === id) playIdx = idx;
        })
        if (playIdx > -1) {
            this.plays.splice(playIdx, 1);
        }
    }
}