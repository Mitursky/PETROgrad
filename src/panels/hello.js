import { useEffect, useState, useRef } from "react";
import {} from "@vkontakte/icons";
import React from "react";
import bridge from "@vkontakte/vk-bridge";
import dynamics from "dynamics.js";
import petrograd from "../img/petrograd.png";
import quiz from "../img/quiz.png";
import map from "../img/map.png";
import {
  Panel,
  Gallery,
  Placeholder,
  Separator,
  Button,
  Snackbar,
  SubnavigationButton,
} from "@vkontakte/vkui";

import { Icon56UsersOutline, Icon56MentionOutline } from "@vkontakte/icons";

const HelloPanel = ({ setStorageData, setActivePanel }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  return (
    <Panel id="hello">
      <Gallery
        slideWidth="100%"
        style={{ height: "100vh" }}
        bullets="dark"
        slideIndex={slideIndex}
        onChange={(e) => {
          setSlideIndex(e);
        }}
      >
        <Placeholder
          style={{
            paddingTop: "32px",
            pointerEvents: "none",
            backgroundColor: "white",
          }}
          icon={<img src={petrograd} height={120} />}
          header={"PETROград"}
        >
          Мини-квест по местам <br />
          Петровского Петербурга
          <div style={{ fontSize: "14px", marginTop: "24px" }}>
            К 350-летию Петра I <br /> в 2022г.
          </div>
        </Placeholder>

        <Placeholder
          style={{
            paddingTop: "32px",
            pointerEvents: "none",
            backgroundColor: "white",
            display: "block",
          }}
          header={
            <body style={{ fontSize: "35px", marginBottom: "20px" }}>
              Маршрут
            </body>
          }
        >
          Посетите 5 значимых мест Петровского Петербурга и найдите ответы на
          все вопросы своими глазами!
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <img
              src={map}
              style={{
                marginTop: "32px",
                width: "100%",
                maxWidth: "500px",
              }}
            />
          </div>
        </Placeholder>

        <Placeholder
          style={{
            paddingTop: "32px",
            pointerEvents: "none",
            backgroundColor: "white",
            display: "block",
          }}
          header={
            <body style={{ fontSize: "35px", marginBottom: "20px" }}>Quiz</body>
          }
        >
          Попробуйте найти ответы на нестандартные вопросы и провести время с
          пользой!
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <img
              src={quiz}
              style={{
                marginTop: "32px",
                width: "100%",
                maxWidth: "500px",
              }}
            />
          </div>
        </Placeholder>
      </Gallery>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          textAlign: "center",
          bottom: "48px",
        }}
      >
        <Button
          size="l"
          onClick={() => {
            if (slideIndex == 2) {
              setStorageData("hello", "true");
              setActivePanel("main");
              bridge.send("VKWebAppGetGeodata");
            } else {
              setSlideIndex(slideIndex + 1);
            }
          }}
          style={{
            width: "250px",
            borderRadius: "16px",
            backgroundColor: "var(--accent)",
          }}
        >
          Далее
        </Button>
      </div>
    </Panel>
  );
};

export default HelloPanel;
