const currentPort = window.location.port;
console.log('Current Port:', currentPort);

const ws = new WebSocket("ws://localhost:1073");

ws.onopen = function () {
    console.log("Connected to the server");
    ws.send("Hello, Server!");
};

ws.onmessage = function (event) {
    console.log(`Received from server: ${event.data}`);
};

ws.onclose = function () {
    console.log("Disconnected from the server");
};
