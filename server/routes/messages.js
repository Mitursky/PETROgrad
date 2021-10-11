const { io } = require("../socket");
const { Users } = require("../db");
const { auth, VkUser, getUser } = require("../functions");

const scan_can = [250, 1000, 10000, 100000];
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

  socket.on("messages", async (text) => {
    console.log(
      `[MESSAGES] [${new Date().toLocaleTimeString("ru-RU", {
        timeZone: "Europe/Moscow",
      })}] [id: ${id}] PARAM - ${text}`
    );
    let user = await getUser(id);
    if (!user) return;
    if (text) {
      text = text.trim();
      if (text.length) {
        io.emit("new_msg", text, id, Date.now(), user.photo_200, user.name);
      }
    }
  });
});

let get;
module.exports = { get };
