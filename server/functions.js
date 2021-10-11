const qs = require("querystring");
const crypto = require("crypto");
const token =
  "8053475f8053475f8053475f48802b14aa880538053475fe082d7a9d03ef88d974043f9";
const fetch = require("node-fetch");
const { Users } = require("./db");

async function VkUser(id) {
  const request = await fetch(
    `https://api.vk.com/method/users.get?user_ids=${id}&lang=ru&fields=photo_200&access_token=${token}&v=5.103`
  );
  const { response } = await request.json();
  return response;
}

function auth(url_security) {
  const urlParams = qs.parse(url_security);

  const ordered = {};
  Object.keys(urlParams)
    .sort()
    .forEach((key) => {
      if (key.slice(0, 3) === "vk_") {
        ordered[key] = urlParams[key];
      }
    });

  const stringParams = qs.stringify(ordered);
  const paramsHash = crypto
    .createHmac("sha256", "0FTWn9sNQtN1doAE7HOU")
    .update(stringParams)
    .digest()
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=$/, "");

  //end
  return paramsHash === urlParams.sign;
}

function friendsAuth(id, user_id, status, sign) {
  const text = `${id}_${user_id}_${status}_0FTWn9sNQtN1doAE7HOU`;
  const md = crypto.createHash("md5").update(text).digest("hex");

  //end
  return md === sign;
}

async function getUser(id, none_create) {
  let user = await Users.findOne({ _id: id }).catch((err) => {
    console.log(err);
  });
  let data = await VkUser(id);
  data = data[0];
  if (!data.first_name) return;
  if (!user && none_create) return false;
  if (!user) {
    user = await new Users({
      _id: id,
      photo_200: data.photo_200,
      name: data.first_name + " " + data.last_name,
    });
    await user.save();
  } else {
    user.name = data.first_name + " " + data.last_name;
    user.photo = data.photo_200;
  }
  return user;
}

module.exports = {
  auth,
  VkUser,
  getUser,
};
