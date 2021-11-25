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
        style={{ height: window.innerHeight + "px" }}
        bullets="dark"
        slideIndex={slideIndex}
        onChange={(e) => {
          setSlideIndex(e);
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            height: window.innerHeight + "px",
          }}
        >
          <Placeholder
            style={{
              pointerEvents: "none",
              marginTop: window.innerHeight / 2 - 200 + "px",
            }}
            icon={<img src={petrograd} height={120} />}
            header={"PETROград"}
          >
            Мини-квест по местам <br />
            Петровского Петербурга
            <body style={{ fontSize: "14px", marginTop: "24px" }}>
              К 350-летию Петра I <br /> в 2022г.
            </body>
          </Placeholder>
        </div>

        <div
          style={{
            backgroundColor: "white",
          }}
        >
          <Placeholder
            style={{
              pointerEvents: "none",
            }}
            icon={
              <img
                src={map}
                width={"150%"}
                style={{
                  position: "absolute",
                  marginLeft: -window.innerWidth + 80 + "px",
                  marginTop: "100px",
                }}
              />
            }
            header={
              <body style={{ fontSize: "35px", marginBottom: "20px" }}>
                Маршрут
              </body>
            }
          >
            Посетите 5 значимых мест Петровского Петербурга и найдите ответы на
            все вопросы своими глазами!
          </Placeholder>
        </div>

        <div style={{ backgroundColor: "white" }}>
          <Placeholder
            style={{
              pointerEvents: "none",
            }}
            icon={
              <img
                src={quiz}
                width={"150%"}
                style={{
                  position: "absolute",
                  marginLeft: -window.innerWidth + 80 + "px",
                  marginTop: "100px",
                }}
              />
            }
            header={
              <body style={{ fontSize: "35px", marginBottom: "20px" }}>
                Quiz
              </body>
            }
          >
            Попробуйте найти ответы на нестандартные вопросы и провести время с
            пользой!
          </Placeholder>
        </div>
      </Gallery>
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
          marginTop: "-75px",
          width: "250px",
          borderRadius: "16px",
          marginLeft: window.innerWidth / 2 - 125 + "px",
          backgroundColor: "var(--accent)",
        }}
      >
        Далее
      </Button>
    </Panel>
  );
};

export default HelloPanel;
