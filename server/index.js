const express = require("express"),
    socketio = require("socket.io"),
    http = require("http"),
    app = express(),
    server = http.createServer(app),
    io = socketio(server),
    Port = process.env.Port || 4000;

server.listen(Port, () => {
    console.log(`server has started on port ${Port}`);
});
