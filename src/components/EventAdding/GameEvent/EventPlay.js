export class EventPlay {

    constructor() {
    }

    id;
    game;
    timeFrom;
    timeTo;
    playersFrom;
    playersTo;
    host;
    players = [];
    freeSpace;

    addPlayer = (player, host) => {
        if (host) {
            this.host = player
            this.players.push(player)
        }
    }

    changeHost = (player) => {
        this.host = player;
    }

    removePlayer = (player) => {
        let index = -1;
        this.players.forEach((p, idx) => {
            if (p.id === player.id) index = idx;
        });
        if (index > -1) {
            this.players.splice(index, 1);
        }
    }


}