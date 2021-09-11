const app = require("express")();
const port = 8000;
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);

const io = new Server(server);

let messages = [];
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connect", (socket) => {
  socket.on("connection", () => {
    socket.broadcast.emit("New user", "New user joined");
    socket.emit("previous messages", messages);
  });

  socket.on("disconnect", () => {
    socket.emit("chat message", "user left");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    messages.push(msg);
  });
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
