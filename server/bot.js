const groupId = 205750709;
const groupToken =
  "ec40e235cef1d256ccd2b16032f72922b0e1cf98677b0534cc398bd6f321001e8f909a005c1a63a59456e";

const { VK, API, resolveResource, Keyboard } = require("vk-io");

const bot = new VK({
  token: groupToken,
  pollingGroupId: groupId,
});

const { updates } = bot;

updates
  .startPolling()
  .then(console.log("VK Polling started"))
  .catch((err) => {
    console.log(err);
  });

function sendMsg(id, text) {
  bot.api.messages.send({
    peer_id: Number(id),
    random_id: 0,
    message: text,
    keyboard: Keyboard.keyboard([
      [
        Keyboard.urlButton({
          label: "Приложение",
          url: "https://vk.com/app7885813",
        }),
      ],
    ]).inline(),
  });
}

module.exports = {
  bot,
  sendMsg,
};
