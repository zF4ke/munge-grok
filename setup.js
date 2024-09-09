const table = new Table(16, 16);
const controller = new TableController(table);

// detect when sessionId element textContent changes and re-encode the text
const sessionIdElement = document.getElementById('sessionId');
const sessionIdObserver = new MutationObserver(() => {
    encodeMessage();
});
sessionIdObserver.observe(sessionIdElement, { childList: true });

let sessionId = controller.randomizeSessionId();

function encodeMessage() {
    const sessionId = controller.getSessionId();
    const text = `Hello noob, your session ID is ${sessionId}. This an example text to be encoded. You can play around with the table and see how the values are read. This is my current interpretation of the table functionality. I hope you like it.`;
    const encodedChars = table.encodeText(text);
    //console.log(encodedChars.length);
    //console.log(encodedChars);
}
