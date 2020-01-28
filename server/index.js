const express = require("express"),
    socketio = require("socket.io"),
    http = require("http"),
    app = express(),
    server = http.createServer(app),
    io = socketio(server),
    Port = process.env.Port || 4000,
    router = require("./router"),
    cors = require("cors"),
    { addUsers, removeUsers, getUsers, getUsersInRoom } = require("./users");

app.use(router);
app.use(cors);

io.on("connection", socket => {
    socket.on("join", ({ name, room }, callback) => {
        const { error, user } = addUsers({ id: socket.id, name, room });
        if (error) return callback(error);
        socket.join(user.room);
        socket.emit("message", {
            user: "admin",
            text: `${user.name}, welcomw to the room ${user.room}`
        }); //telling user he is welcome to the chat
        socket.broadcast.to(user.room).emit("message", {
            user: "admin",
            text: `${user.name} has joined`
        }); //telling everyone else he has joined
        socket.join(user.room);

        io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUsersInRoom(user.room)
        });
        callback();
    });
    socket.on("sendMessage", (message, callback) => {
        const user = getUsers(socket.id);
        console.log("user is found :", user);
        if (!user) return { error: "room not found" };
        if (user) {
            io.to(user.room).emit("message", {
                user: user.name,
                text: message
            });
            io.to(user.room).emit("roomData", {
                room: user.room,
                users: getUsersInRoom(user.room)
            });
        }
        callback();
    });
    socket.on("disconnect", () => {
        const user = removeUsers(socket.id);
        if (user) {
            io.to(user.room).emit("message", {
                user: "admin",
                text: `${user.name} has left`
            });
        }
    });
});

server.listen(Port, () => {
    console.log(`server has started on port ${Port}`);
});
