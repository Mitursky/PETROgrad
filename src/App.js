import {} from "@vkontakte/vkui";
import { useState, useEffect, useRef } from "react";
import {} from "@vkontakte/icons";
import React from "react";
import bridge from "@vkontakte/vk-bridge";
import MainPanel from "./panels/main_panel.js";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { io } from "socket.io-client";
import { ModalChat } from "./modals/chat.js";
import { createMarker } from "./functions.js";
import "./styles.css";
bridge.send("VKWebAppInit");
let socket;
console.log(process.env.NODE_ENV);
let userGeoFunc;
function App() {
  const [loadGeo, setLoadGeo] = useState(true);
  const [activePanel, setActivePanel] = useState("main");
  const [theme, setTheme] = useState("white");
  const [user, setUser] = useState({ photo_200: "", name: "", id: 0 });
  const [modal, setModal] = useState(null);
  const [text, setText] = useState("");
  const [geodata, setGeodata] = useState({ lat: null, long: null });

  const [lng, setLng] = useState(30.19);
  const [lat, setLat] = useState(59.93);
  const [zoom, setZoom] = useState(11);

  const [info, setInfo] = useState({});

  const map = useRef(null);

  const platformSign = window.location.search
    .slice(1)
    .split("platform=")[1]
    .split("&")[0];

  function userRedraw() {
    console.log(geodata, user);
    if (!user?.first_name || !geodata?.lat || !map) return;
    createMarker({
      src: user.photo_200,
      className: "me",
      map: map.current,
      lng: geodata.long,
      lat: geodata.lat,
    });
  }
  userRedraw();

  useEffect(() => {
    userGeoFunc = (data) => {
      setGeodata(data);
      if (!modal) {
        map.current.flyTo({
          center: [data.long, data.lat],
        });
      }
      setLoadGeo(false);
    };
  });

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      console.log(type);
      if (type === "VKWebAppUpdateConfig") {
        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme ? data.scheme : "client_light";
        setTheme(
          data.scheme && data.scheme == "bright_light" ? "white" : "black"
        );
        // document.body.attributes.setNamedItem(schemeAttribute);
        bridge.send("VKWebAppGetUserInfo");
        bridge.send("VKWebAppGetGeodata");
      }

      if (
        type === "VKWebAppGeodataResult" ||
        type === "VKWebAppGetGeodataResult"
      ) {
        userGeoFunc(data);
      }

      if (type === "VKWebAppGetUserInfoResult") {
        setUser(data);
      }
    });
  }, []);

  return (
    <View
      activePanel={activePanel}
      modal={
        <ModalChat
          modal={modal}
          socket={socket}
          setModal={setModal}
          text={text}
          info={info}
          map={map}
          setText={setText}
          platformSign={platformSign}
        />
      }
    >
      <MainPanel
        text={text}
        setText={setText}
        theme={theme}
        lng={lng}
        lat={lat}
        zoom={zoom}
        info={info}
        setInfo={setInfo}
        socket={socket}
        setActivePanel={setActivePanel}
        id="main"
        setModal={setModal}
        map={map}
        loadGeo={loadGeo}
        setLoadGeo={setLoadGeo}
      />
    </View>
  );
}

export default App;
