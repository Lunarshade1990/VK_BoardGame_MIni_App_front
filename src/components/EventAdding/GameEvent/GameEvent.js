export class GameEvent {
    constructor(type, creator, place) {
        this.type = type;
        this.creator = creator;
        this.place = place
    }

    static lastTableId = 0;
    tables = [];

    addTable = (table) => {
        if (table.type === 'virtual') table.id = ++GameEvent.lastTableId;
        this.tables.push(table);
        return GameEvent.lastTableId;
    }

    getTableById = (id) => {
        return this.tables.filter(t => t.id === id)[0];
    }

    removeTable = (table) => {
        let index = -1;
        this.tables.forEach((t, idx) => {
            if (t.id === table.id) index = idx;
        });
        if (index > -1) {
            this.tables.splice(index, 1);
        }
    }

}