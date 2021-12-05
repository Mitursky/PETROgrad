import {
  Avatar,
  Snackbar,
  withAdaptivity,
  SplitLayout,
  SplitCol,
  Spinner,
  Panel,
} from "@vkontakte/vkui";
import { useState, useEffect, useRef } from "react";
import { Icon20CancelCircleFillRed } from "@vkontakte/icons";
import React from "react";
import bridge from "@vkontakte/vk-bridge";
import MainPanel from "./panels/main_panel.js";
import ClosePanel from "./panels/close.js";
import HelloPanel from "./panels/hello";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { io } from "socket.io-client";
import { ModalChat } from "./modals/chat.js";
import { createMarker } from "./functions.js";
import "./styles.css";
import "./css/ModalPage.css";
import mapboxgl from "mapbox-gl";
import mitursky from "./img/mitursky.png";
import generateBuildings from "./buildings";
//import eruda from "./eruda";

let socket;

let userGeoFunc;
function App() {
  const [error, setError] = useState(false);
  const [storage, setStorage] = useState({});
  const [loadGeo, setLoadGeo] = useState(true);
  const [activePanel, setActivePanel] = useState("loading");
  const [theme, setTheme] = useState("white");
  const [user, setUser] = useState({ photo_200: "", name: "", id: 0 });
  const [modal, setModal] = useState(null);
  const [text, setText] = useState("");
  const [geodata, setGeodata] = useState({ lat: null, long: null });

  const [lng, setLng] = useState(30.317488);
  const [lat, setLat] = useState(59.950186);
  const [zoom, setZoom] = useState(11);
  const [story, setStory] = useState([]);
  const [info, setInfo] = useState({});

  const map = useRef(null);
  const mapContainer = useRef(null);
  const platformSign = window.location.search
    .slice(1)
    .split("platform=")[1]
    .split("&")[0];
  const setStorageData = (key, value) => {
    bridge.send("VKWebAppStorageSet", { key: key, value: value });
  };

  //setStorageData("hello", "false");

  let goBack;
  const goNext = ({ name, type }) => {
    window.history.pushState({ panel: "main" }, "main");

    if (type == "modal") {
      console.log([...story, { type, name }]);
      setStory([...story, { type, name }]);
      setModal(name);
    }
  };

  function userRedraw() {
    if (!user?.first_name || !geodata?.lat || !map.current) return;
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
      if (!modal && map.current) {
        console.log("go");
        map.current.flyTo({
          center: [data.long, data.lat],
          zoom: 12,
        });
      }
      setGeodata(data);
      setLoadGeo(false);
    };
  });

  useEffect(() => {
    bridge.send("VKWebAppInit");
    bridge.subscribe(({ detail: { type, data } }) => {
      console.log(data, type);
      if (type === "VKWebAppUpdateConfig") {
        bridge.send("VKWebAppStorageGetKeys", { count: 100, offset: 0 });
        /* const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme ? data.scheme : "client_light";
        setTheme(
          data.scheme && data.scheme == "bright_light" ? "white" : "black"
        );*/
      }

      if (
        type === "VKWebAppGeodataResult" ||
        type === "VKWebAppGetGeodataResult"
      ) {
        if (data.available && data.lat) {
          userGeoFunc(data);
          setError(false);
        }
      }

      if (type === "VKWebAppGetUserInfoResult") {
        setUser(data);
        bridge.send("VKWebAppGetGeodata");
      }
      if (type == "VKWebAppStorageGetKeysResult") {
        if (data.keys.length) {
          bridge.send("VKWebAppStorageGet", { keys: data.keys });
        } else {
          start({ hello: "false" });
        }
      }
      function start(obj) {
        bridge.send("VKWebAppGetUserInfo");

        if (activePanel == "loading") {
          if (
            window.location.search.split("vk_platform=")[1].split("&")[0] ==
            "mobile_iphone"
          ) {
            setActivePanel("close");
          } else {
            if (obj?.hello == "true") {
              setActivePanel("main");
            } else {
              setActivePanel("hello");
            }
          }
        }
      }

      if (type == "VKWebAppStorageGetResult") {
        let obj = {};
        for (let i in data.keys) {
          obj[data.keys[i].key] = data.keys[i].value;
        }
        setStorage(obj);
        start(obj);
      }

      if (
        type == "VKWebAppGeodataFailed" ||
        type == "VKWebAppGetGeodataFailed" ||
        (type == "VKWebAppGetGeodataResult" && !data.available) ||
        (type == "VKWebAppGetGeodataResult" && !data.lat)
      ) {
        setError(true);
      }
    });
  }, []);

  return (
    <SplitLayout>
      <SplitCol>
        <View
          activePanel={activePanel}
          modal={
            <ModalChat
              modal={modal}
              socket={socket}
              setModal={setModal}
              text={text}
              info={info}
              setActivePanel={setActivePanel}
              map={map}
              storage={storage}
              setText={setText}
              geodata={geodata}
              user={user}
              platformSign={platformSign}
              goBack={goBack}
              goNext={goNext}
              setStorage={setStorage}
              setStorageData={setStorageData}
              story={story}
              setStory={setStory}
            />
          }
        >
          <Panel id="close">
            <ClosePanel />
          </Panel>
          <MainPanel
            text={text}
            setText={setText}
            theme={theme}
            mapContainer={mapContainer}
            lng={lng}
            lat={lat}
            zoom={zoom}
            info={info}
            setInfo={setInfo}
            socket={socket}
            setActivePanel={setActivePanel}
            id="main"
            goNext={goNext}
            setModal={setModal}
            map={map}
            error={error}
            setError={setError}
            loadGeo={loadGeo}
            setLoadGeo={setLoadGeo}
            goBack={goBack}
            activePanel={activePanel}
            goNext={goNext}
            storage={storage}
          />
          <HelloPanel
            id="hello"
            setStorageData={setStorageData}
            setActivePanel={setActivePanel}
          />
          <Panel id="loading">
            <img
              src={mitursky}
              style={{
                width: window.innerWidth * 0.75,
                marginLeft: "12.5%",
                marginTop: window.innerHeight / 3,
              }}
            />
            <Spinner
              size="medium"
              style={{ margin: "40px 0", color: "var(--accent)" }}
            />
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
}

App = withAdaptivity(App, { viewWidth: true });

export default App;
