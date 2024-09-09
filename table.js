class Table {
    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.table = this.createTable(w, h);
        this.showCoordinates = false;
    }

    createTable(w, h) {
        const table = {
            rows: [],
            e: document.createElement('table')
        }

        for (let i = 0; i < h; i++) {
            const row = {
                cells: [],
                e: document.createElement('tr')
            }

            for (let j = 0; j < w; j++) {
                const cell = {
                    value: 0,
                    coords: { x: j, y: i },
                    e: document.createElement('td')
                }

                cell.e.className = 'border-zinc-500 border-2 h-12 w-12 text-center text-zinc-300 cursor-default hover:bg-zinc-700 hover:text-zinc-400 duration-300 bg-zinc-800';
                // on right click toggle the cell value or coordinates
                cell.e.addEventListener('contextmenu', (event) => {
                    event.preventDefault();

                    this.showCoordinates = !this.showCoordinates;
                    
                    this.updateCells();
                });

                cell.e.textContent = cell.value;
                row.cells.push(cell);
                row.e.appendChild(cell.e);
            }

            table.rows.push(row);
            table.e.appendChild(row.e);
        }

        document.body.appendChild(table.e);
        return table;
    }

    updateCells() {
        if (this.showCoordinates) {
            for (let k = 0; k < this.table.rows.length; k++) {
                for (let l = 0; l < this.table.rows[k].cells.length; l++) {
                    this.table.rows[k].cells[l].e.textContent = `(${l.toString(16)}, ${k.toString(16)})`;
                }
            }
        } else {
            for (let k = 0; k < this.table.rows.length; k++) {
                for (let l = 0; l < this.table.rows[k].cells.length; l++) {
                    this.table.rows[k].cells[l].e.textContent = this.table.rows[k].cells[l].value;
                }
            }
        }
    }

    getCell(x, y) {
        return this.table.rows[y].cells[x].value;
    }

    setCell(x, y, value) {
        this.table.rows[y].cells[x].value = value;
        this.table.rows[y].cells[x].e.textContent = value;
    }

    clear() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.setCell(j, i, '');
            }
        }
    }

    randomize() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                const max = 255;
                const min = 0;
                const n = Math.floor(Math.random() * (max - min + 1) + min);

                this.setCell(j, i, n);
            }
        }
    }

    encodeText(text) {
        // convert string to array of char codes (0-255) and set them in the cells by row
        const charCodes = text.split('').map(char => char.charCodeAt(0));
        // if charCodes is longer than the table, truncate it
        // if charCodes is shorter than the table, pad it with 0s
        const paddedCharCodes = charCodes.concat(Array(this.width * this.height - charCodes.length).fill(0));
        let index = 0;
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.setCell(j, i, paddedCharCodes[index++]);
            }
        }

        return charCodes;
    }
}