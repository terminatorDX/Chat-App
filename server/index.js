const express = require("express"),
    socketio = require("socket.io"),
    http = require("http"),
    app = express(),
    server = http.createServer(app),
    io = socketio(server),
    Port = process.env.Port || 4000,
    router = require("./router");

io.on("connection", socket => {
    console.log("we have a new connecton");
    socket.on("join", ({ name, room }, callback) => {
        console.log(name, room);
        const error = true;
        if (error) {
            callback({ error: "error" });
        }
    });
    socket.on("disconnect", () => {
        console.log("user have left");
    });
});

app.use(router);
server.listen(Port, () => {
    console.log(`server has started on port ${Port}`);
});
