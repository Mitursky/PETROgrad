const { io } = require("../socket");
const { Users } = require("../db");
const { auth, VkUser, getUser } = require("../functions");

io.on("connection", (socket) => {
  if (
    !socket.handshake.auth ||
    !socket.handshake.auth.token ||
    !socket.handshake.auth.token.split("vk_user_id=")
  )
    return;
  let id = Number(
    socket.handshake.auth.token.split("vk_user_id=")[1].split("&")[0]
  );
  if (!auth(socket.handshake.auth.token)) return;

  socket.on("get", async () => {
    console.log(
      `[GET] [${new Date().toLocaleTimeString("ru-RU", {
        timeZone: "Europe/Moscow",
      })}] [id: ${id}]`
    );
    let user = await getUser(id);
    socket.emit("userData", user);
    user.last_id = socket.id;
    await Users.updateOne({ _id: id }, user);
  });
});

let get;
module.exports = { get };
