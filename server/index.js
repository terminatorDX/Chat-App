const express = require("express"),
    socketio = require("socket.io"),
    http = require("http"),
    app = express(),
    server = http.createServer(app),
    io = socketio(server),
    Port = process.env.Port || 4000,
    router = require("./router"),
    { addUsers, removeUsers, getUsers, getUsersInRoom } = require("./users");

io.on("connection", socket => {
    socket.on("join", ({ name, room }, callback) => {
        const { error, user } = addUsers({ id: socket.id, name, room });
        if (error) {
            return callback(error);
        }
        socket.emit("message", {
            user: "admin",
            text: `${user.name}, welcomw to the room ${user.room}`
        }); //telling user he is welcome to the chat
        socket.broadcast.to(user.room).emit("message", {
            user: "admin",
            text: `${user.name} has joined`
        }); //telling everyone else he has joined
        socket.join(user.room);
        callback();
    });
    socket.on("sendMessage", (message, callback) => {
        const user = getUsers(socket.id);
        console.log("user is found :", user);
        io.to(user.room).emit("message", { user: user.name, text: message });
        callback();
    });
    socket.on("disconnect", () => {
        console.log("user have left");
    });
});

app.use(router);
server.listen(Port, () => {
    console.log(`server has started on port ${Port}`);
});
