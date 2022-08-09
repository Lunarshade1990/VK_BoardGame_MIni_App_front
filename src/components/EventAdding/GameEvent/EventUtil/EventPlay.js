export class EventPlay {

    constructor() {
        this.players = [];
        this.virtualPlayers = [];
    }

    id;
    game;
    timeFrom;
    timeTo;
    playersFrom;
    playersTo;
    host;
    freeSpace;
    comment;
    tableId;

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