import { animate, IconButton, Search } from "@vkontakte/vkui";
import { useEffect, useState, useRef } from "react";
import {} from "@vkontakte/icons";
import React from "react";
import bridge from "@vkontakte/vk-bridge";
import dynamics from "dynamics.js";
import {
  Panel,
  Avatar,
  FixedLayout,
  Spinner,
  Snackbar,
  SubnavigationButton,
} from "@vkontakte/vkui";

import {
  Icon20CancelCircleFillRed,
  Icon28LocationMapOutline,
  Icon36AdvertisingOutline,
  Icon24TargetOutline,
  Icon16Location,
  Icon24Report,
  Icon28BankOutline,
  Icon28CancelCircleFillRed,
  Icon28CommentCircleFillGreen,
  Icon28CheckCircleFill,
} from "@vkontakte/icons";
import mapboxgl from "mapbox-gl";
import { createMarker } from "../functions";
import generateBuildings from "../buildings";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWl0dXJza3kiLCJhIjoiY2t1Mm1rODBoMnNlejJzcW56MnJ6dmFzOSJ9.czgQtgAZPb81wq1ahUZmgQ";
opacity();

function opacity() {
  if (window?.timeout > 0) {
    window.timeout -= 1;
  } else {
    let obj = document.getElementById("yes");
    if (obj) {
      if (obj.style.opacity && obj.style.opacity > 0) {
        document.getElementById("yes").style.opacity -= 0.08;
      }
    }
    let obj2 = document.getElementById("no");
    if (obj2) {
      if (obj2.style.opacity && obj2.style.opacity > 0) {
        document.getElementById("no").style.opacity -= 0.08;
      }
    }
  }

  requestAnimationFrame(opacity);
}
const MainPanel = ({
  setActivePanel,
  setModal,
  map,
  lng,
  lat,
  storage,
  setInfo,
  loadGeo,
  error,

  mapContainer,
  activePanel,
  goNext,
  setLoadGeo,
}) => {
  const [peoples, SetPeoples] = useState([]);
  const [activeTab, setActiveTab] = useState(250);
  const [snackbar, setSnackbar] = useState(null);

  //maps
  let procent = 0;
  for (let key in storage) {
    if (storage[key] == "complete") {
      procent += 20;
    }
  }
  useEffect(() => {
    if (map.current || activePanel != "main") return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mitursky/ckw5dv4nm11ub14l0i2fpi03u",
      center: [lng, lat],
      zoom: 12,
      maxZoom: 20,
      minZoom: 8,
    });
    let buildings = generateBuildings({ map, setInfo, setModal, goNext });
    for (let i in buildings) {
      if (storage[buildings[i].id] == "complete") {
        buildings[i].complete = true;
      }
      createMarker(buildings[i]);
    }
  });

  const normalize_distance = (distance) => {
    let res = "";
    distance = distance * 1000;
    if (distance > 1000) {
      distance /= 1000;
      res = distance.toFixed(1) + " км";
    } else {
      if (distance < 10) {
        res = "Рядом";
      } else {
        res = distance.toFixed(0) + " м";
      }
    }
    return res;
  };

  function ErrorBar(text) {
    if (snackbar) return;
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={
          <Avatar size={24}>
            <Icon20CancelCircleFillRed width={24} height={24} />
          </Avatar>
        }
      >
        {text}
      </Snackbar>
    );
  }
  function InfoBar(text) {
    if (snackbar) return;
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={
          <Avatar size={24}>
            <Icon28CommentCircleFillGreen width={24} height={24} />
          </Avatar>
        }
      >
        {text}
      </Snackbar>
    );
  }

  //map

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (
        type == "VKWebAppGeodataFailed" ||
        type == "VKWebAppGetGeodataFailed" ||
        (type == "VKWebAppGetGeodataResult" && !data.available) ||
        (type == "VKWebAppGetGeodataResult" && !data.lat)
      ) {
        //setLoading(false);

        ErrorBar(
          "Включите местоположение на устройстве, чтобы мы смогли вас найти."
        );
      }
    });
  }, []);

  return (
    <Panel id="main">
      <div
        ref={mapContainer}
        className="map-container"
        style={{ height: window.innerHeight + "px" }}
      />

      <FixedLayout vertical="bottom" style={{ overflow: "visible" }}>
        <IconButton
          onClick={() => {
            map.current.flyTo({
              center: [30.317488, 59.950186],
              zoom: 12,
            });
          }}
          style={{
            marginLeft: window.innerWidth / 2 - 30 + "px",
            position: "absolute",
          }}
        >
          <body
            style={{
              marginTop: "-48px",
              backgroundColor: "#0000006e",
              borderRadius: "100px",
              width: "70px",
              position: "absolute",
              height: "70px",
            }}
          >
            <Icon28BankOutline
              style={{
                marginLeft: "10px",
                marginTop: "10px",
                position: "absolute",
              }}
              fill={"white"}
              width={50}
              height={50}
            />
          </body>
        </IconButton>
        <SubnavigationButton
          onClick={() => {
            if (procent == 100) {
              InfoBar(
                "Вы успешно прошли квест! Вы большой(ая) молодец. Можете показать это сообщение вашему преподавателю или рассказать про приложение друзьям!"
              );
            } else {
              InfoBar(
                "Чтобы пройти квест, необходимо посетить все точки маршрута и правильно ответить на Quiz"
              );
            }
          }}
          selected
          before={<Icon28LocationMapOutline width={24} height={24} />}
          style={{
            marginTop: "12px",
            marginLeft: "8px",
            position: "absolute",
          }}
        >
          {procent}%
        </SubnavigationButton>

        <IconButton
          hasActive={false}
          style={{
            backgroundColor: !loadGeo ? "var(--accent)" : "#000000b8",
            marginBottom: "8px",
            marginLeft: window.innerWidth - 56 + "px",
          }}
          onClick={() => {
            bridge.send("VKWebAppGetGeodata");
            setLoadGeo(true);
          }}
          children={
            !loadGeo ? (
              <Icon16Location width={24} height={24} fill={"white"} />
            ) : error ? (
              <Icon24Report fill={"white"} />
            ) : (
              <Spinner
                size="small"
                style={{
                  color: "var(--button_primary_foreground)",
                }}
              />
            )
          }
        />
      </FixedLayout>

      {snackbar}
    </Panel>
  );
};

export default MainPanel;
