export class GameEvent {
    constructor(type) {
        this.type = type;
    }

    static lastTableId = 0;
    tables = [];

    addTable = (table) => {
        if (table.type === 'virtual') table.table.id = ++GameEvent.lastTableId;
        this.tables.push(table);
        return GameEvent.lastTableId;
    }

    getTableById = (id) => {
        return this.tables.filter(t => t.table.id === id)[0];
    }

    removeTable = (table) => {
        let index = -1;
        this.tables.forEach((t, idx) => {
            if (t.table.id === table.id) index = idx;
        });
        if (index > -1) {
            this.tables.splice(index, 1);
        }
    }

}