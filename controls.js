class TableController {
    constructor(table) {
        this.table = table;

        this.output = '';
        this.lastValue = 0;
        this.sessionId = this.randomizeSessionId();

        // add event listeners to the grok button
        const grokButton = document.getElementById('grok-button');
        grokButton.addEventListener('click', () => {
            // get cell coordinates from the input fields
            const x = parseInt(document.getElementById('grok-x').value, 16);
            const y = parseInt(document.getElementById('grok-y').value, 16);

            // grok the cell
            this.grok(x, y);

            console.log('Grok:', x, y);
        });

        // add event listeners to the munge button
        const mungeButton = document.getElementById('munge-button');
        mungeButton.addEventListener('click', () => {
            this.munge();
        });

        // add event listeners to the regenerate id button
        const regenerateIdButton = document.getElementById('regen-id-button');
        regenerateIdButton.addEventListener('click', () => {
            this.randomizeSessionId();
        });
    }

    randomizeSessionId() {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        console.log('Session ID:', result);

        this.setSessionId(result);

        return result;
    }

    setSessionId(sessionId) {
        const sessionIdElement = document.getElementById('sessionId');

        sessionIdElement.textContent = sessionId;
        this.sessionId = sessionId;
    }

    setOutput(output) {
        const outputElement = document.getElementById('output');

        outputElement.textContent = output;
    }

    setLastValue(lastValue) {
        const lastValueElement = document.getElementById('lastValue');

        lastValueElement.textContent = lastValue;
    }

    getSessionId() {
        return this.sessionId;
    }

    munge() {
        this.lastValue = Math.floor(Math.random() * 256);
        this.setLastValue(this.lastValue);
    }

    grok(x, y) {
        const value = this.table.getCell(x, y);

        this.output = this.lastValue ^ value;
        this.lastValue = value;

        this.setOutput(this.output);
        this.setLastValue(this.lastValue);
    }
}