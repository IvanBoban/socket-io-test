const app = require("express")();
const port = 8000;
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);

const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connect", (socket) => {
  socket.on("disconnect", () => {
    emitMessage("User disconnected");
  });

  socket.on("chat message", (msg) => {
    emitMessage(msg);
  });
});

io.on("connection", (socket) => {
  socket.broadcast.emit("New user joined");
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

function emitMessage(msg) {
  io.emit("chat message", msg);
}
