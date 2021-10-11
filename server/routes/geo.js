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

  socket.on("geo", async ({ geodata, scan_distance } = {}) => {
    console.log(
      `[GEO] [${new Date().toLocaleTimeString("ru-RU", {
        timeZone: "Europe/Moscow",
      })}] [id: ${id}]`
    );
    let user = await getUser(id);
    if (geodata && geodata.lat && geodata.long) {
      user.geodata = geodata;
    }

    if (scan_can.find((item) => item == scan_distance)) {
      user.scan_distance = scan_distance;
    }
    await Users.updateOne({ _id: id }, user);

    let peoples = await Users.aggregate([
      {
        $project: {
          name: "$name",
          photo_200: "$photo_200",
          lat: "$geodata.lat",
          long: "$geodata.long",
          distance: {
            $function: {
              body: function (geo, geo2) {
                if (!geo) return 999999;
                if (!geo2) return 999999;
                if (!geo.lat) return 999999;
                if (!geo2.lat) return 999999;
                function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
                  var R = 6371; // Radius of the earth in km
                  var dLat = deg2rad(lat2 - lat1); // deg2rad below
                  var dLon = deg2rad(lon2 - lon1);
                  var a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(deg2rad(lat1)) *
                      Math.cos(deg2rad(lat2)) *
                      Math.sin(dLon / 2) *
                      Math.sin(dLon / 2);
                  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                  var d = R * c; // Distance in km
                  return d;
                }

                function deg2rad(deg) {
                  return deg * (Math.PI / 180);
                }
                return getDistanceFromLatLonInKm(
                  geo.lat,
                  geo.long,
                  geo2.lat,
                  geo2.long
                );
              },
              args: ["$geodata", user.geodata],
              lang: "js",
            },
          },
        },
      },
      {
        $match: {
          $and: [
            { distance: { $lt: user.scan_distance / 1000 } },
            { _id: { $not: { $in: [user._id] } } },
          ],
        },
      },
    ]);

    socket.emit("around", peoples, user.scan_distance);
  });
});

let get;
module.exports = { get };
