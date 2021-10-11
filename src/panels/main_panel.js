import { animate, IconButton, Search } from "@vkontakte/vkui";
import { useEffect, useState, useRef } from "react";
import {} from "@vkontakte/icons";
import React from "react";
import bridge from "@vkontakte/vk-bridge";
import dynamics from "dynamics.js";
import {
  Panel,
  PanelHeader,
  Group,
  HorizontalScroll,
  Avatar,
  HorizontalCell,
  Header,
  FixedLayout,
  Spinner,
  TabsItem,
  Tabs,
  Snackbar,
  Placeholder,
} from "@vkontakte/vkui";
import mapboxgl from "mapbox-gl";
import {
  Icon20CancelCircleFillRed,
  Icon28LocationMapOutline,
  Icon36AdvertisingOutline,
  Icon16Location,
} from "@vkontakte/icons";

import { createMarker } from "../functions";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWl0dXJza3kiLCJhIjoiY2t1Mm1rODBoMnNlejJzcW56MnJ6dmFzOSJ9.czgQtgAZPb81wq1ahUZmgQ";
let startAnimation;
function animate_button_back() {
  let el = document.getElementById("but");
  if (el) {
    dynamics.animate(
      el,
      {
        translateY: 0,
      },
      {
        type: dynamics.spring,
        duration: 2000,
        frequency: 166,
      }
    );
  }
  eldiv("div");
  eldiv("div2");
  function eldiv(id) {
    let el = document.getElementById(id);
    if (el) {
      dynamics.animate(
        el,
        {
          opacity: id == "div" ? 0.7 : 0.5,
          scale: 1,
        },
        {
          type: dynamics.easeInOut,
          duration: 500,
          frequency: 166,
        }
      );
    }
  }
}
function animate_button() {
  let el = document.getElementById("but");
  if (el) {
    dynamics.animate(
      el,
      {
        translateY: -100,
      },
      {
        type: dynamics.easeInOut,
        duration: 350,
      }
    );
  }
  eldiv("div");
  eldiv("div2");

  function eldiv(id) {
    let el = document.getElementById(id);
    if (el) {
      dynamics.animate(
        el,
        {
          opacity: 0,
          scale: 1.5,
        },
        {
          type: dynamics.easeInOut,
          duration: 400,
        }
      );
    }
  }
}

const MainPanel = ({
  setActivePanel,
  socket,
  theme,
  setModal,
  map,
  lng,
  lat,
  zoom,
  info,
  setInfo,
  loadGeo,
  setLoadGeo,
}) => {
  const [peoples, SetPeoples] = useState([]);
  const [activeTab, setActiveTab] = useState(250);
  const [snackbar, setSnackbar] = useState(null);

  //maps
  const mapContainer = useRef(null);

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

  const search = () => {
    animate_button();
    //setLoading(true);
    startAnimation = Date.now();
  };
  //map
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
      maxZoom: 15,
      minZoom: 10,
    });

    createMarker({
      src: "https://guideshop.ru/wp-content/uploads/2020/11/original.jpg",
      className: "buildings",
      map: map.current,
      func: setModal,
      arg: "info",
      name: "Дворец Название",
      subtitle: "Построен в 1234г.",
      text: `Очень интересный текст описывающий дворец, Питер классный город, дожди
      в нём меня совсем не беспокоят. Это просто рыбный текст. Рыбы - лучшие. 
      Очень интересный текст описывающий дворец, Питер классный город, дожди
      в нём меня совсем не беспокоят. Это просто рыбный текст. `,
      setInfo: setInfo,
    });

    createMarker({
      src: "https://sun9-20.userapi.com/t9YgK6pARK4PHv6ESD3OsUL0RIqiWe5QFM49Yg/xVdW7mK6Abs.jpg",
      className: "buildings",
      map: map.current,
      lng: 30.23,
      lat: 59.93,
      setInfo: setInfo,
      func: setModal,
      arg: "info",
      name: "Памятник культуры",
      subtitle: "Построен в 1783г.",
      text: `Очень интересный текст описывающий памятник, Питер классный город, дожди
      в нём меня совсем не беспокоят. Это просто рыбный текст. Рыбы - лучшие. 
      Очень интересный текст описывающий памятник, Питер классный город, дожди
      в нём меня совсем не беспокоят. Это просто рыбный текст.  
      Очень интересный текст описывающий памятник, Питер классный город, дожди
      в нём меня совсем не беспокоят. Это просто рыбный текст. Рыбы - лучшие. 
      Очень интересный текст описывающий памятник, Питер классный город, дожди
      в нём меня совсем не беспокоят. Это просто рыбный текст.`,
      setInfo: setInfo,
    });
  });

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type == "VKWebAppGeodataFailed") {
        //setLoading(false);
        ErrorBar("Включи местоположение, мы всё равно знаем где ты.");
        if (Date.now() - startAnimation < 500) {
          setTimeout(() => {
            animate_button_back();
          }, 500 - (Date.now() - startAnimation));
        } else {
          animate_button_back();
        }
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

      <FixedLayout vertical="bottom">
        <IconButton
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
