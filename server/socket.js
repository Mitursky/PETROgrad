let io;

if (process.env.NODE_ENV == "development") {
  //local
  io = require("socket.io")(3001, {
    cors: {
      origin: [
        "https://prod-app7895215-b389492a03e3.pages-ac.vk-apps.com",
        "http://localhost:3001",
        "http://localhost:3000",
      ],
    },
  });
} else {
  //prod
  const fs = require("fs");
  const options = {
    key: fs.readFileSync("./srt/key.key"),
    cert: fs.readFileSync("./srt/cert.crt"),
    ca: fs.readFileSync("./srt/domain.com.cabundle"),
  };
  const express = require("express");
  const app = express();
  const path = require("path");
  const server = require("https").createServer(options, app);
  io = require("socket.io")(server);
  const port = 3000;

  server.listen(port, () => {
    console.log("Server listening at port %d", port);
  });

  app.use(express.static(path.join(__dirname, "public")));
}

module.exports = { io };
