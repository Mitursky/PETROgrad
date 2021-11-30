import {
  ModalPageHeader,
  PanelHeaderClose,
  Div,
  ModalPage,
  ANDROID,
  IOS,
  ModalRoot,
  usePlatform,
  VKCOM,
  Text,
  Headline,
  Avatar,
  Group,
  Title,
  Button,
  PanelHeaderButton,
  FixedLayout,
} from "@vkontakte/vkui";
import styled from "styled-components";
import { useEffect, useState, Fragment } from "react";
import {
  Icon24Cancel,
  Icon28LocationMapOutline,
  Icon24LightbulbStarOutline,
  Icon28ChecksOutline,
} from "@vkontakte/icons";
import React from "react";
import "../css/ModalRoot.css";
import { Socket } from "socket.io";
import { tSEnumDeclaration } from "@babel/types";
import "../css/ModalPageHeader.css";
import { ModalMore } from "./more";
import { ModalQuiz } from "./quiz";
import { getNodeText } from "@testing-library/dom";
import bridge from "@vkontakte/vk-bridge";

let flyBack;
let isDesktop =
  window.location.search.split("vk_platform=")[1].split("&")[0] ==
  "desktop_web";
const ModalChat = ({
  modal,
  setModal,
  socket,
  setActivePanel,
  storage,
  text,
  setText,
  setStorage,
  info,
  setStorageData,
  goBack,
  geodata,
  map,
  goNext,
  story,
  user,
  setStory,
}) => {
  const platform = usePlatform();
  const [msg, setMsg] = useState([]);
  const [UPD, setUPD] = useState();

  goBack = () => {
    console.log("goback", story);
    let current;
    if (story.length == 0) {
      console.log("close");
      bridge.send("VKWebAppClose", {
        status: "success",
        payload: { name: "test" },
      });
    }
    if (story[story.length - 2]) {
      current = story[story.length - 2];
      if (current.type == "modal") {
        story.pop();
        setStory([...story]);
        setModal(current.name);
      }
    } else {
      if (story[story.length - 1]) {
        current = story[story.length - 1];
        if (current.type == "modal") {
          console.log("flyback");
          story.pop();
          setStory([...story]);
          setModal(null);
          flyBack();
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("popstate", goBack);
    return function cleanup() {
      window.removeEventListener("popstate", goBack);
    };
  });

  window.text = text;
  window.user = user;

  useEffect(() => {
    flyBack = () => {
      if (info.goBack) {
        map.current.flyTo({
          center: info.goBack.center,
          zoom: info.goBack.zoom,
        });
      }
    };
  });

  return (
    <ModalRoot
      activeModal={modal}
      onClose={() => {
        goBack();
        flyBack();
      }}
    >
      <ModalPage
        id="info"
        header={
          <ModalPageHeader
            left={
              <Fragment>
                {(platform === ANDROID || platform === VKCOM) && (
                  <PanelHeaderButton
                    onClick={() => {
                      goBack();
                      flyBack();
                    }}
                  >
                    <Icon24Cancel />
                  </PanelHeaderButton>
                )}
              </Fragment>
            }
            right={
              <Fragment>
                {platform === IOS && (
                  <PanelHeaderButton
                    onClick={() => {
                      goBack();
                      flyBack();
                    }}
                  >
                    Закрыть
                  </PanelHeaderButton>
                )}
              </Fragment>
            }
          >
            PETROград
          </ModalPageHeader>
        }
      >
        <Div
          style={{
            display: "flex",
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            borderRadius: "0 0 8px 8px",
            marginBottom: "8px",
          }}
        >
          <Button
            size="m"
            stretched
            before={<Icon28LocationMapOutline width={24} height={24} />}
            onClick={() => {
              let a = document.createElement("a");
              Object.assign(a, {
                href: info.place_url,
                target: "_blank",
              });
              a.click();
            }}
            style={{ marginRight: "8px" }}
          >
            Google карты
          </Button>

          <Button
            stretched
            size="m"
            mode={info.quiz ? "commerce" : "secondary"}
            onClick={() => {
              if (info.quiz) {
                goNext({ type: "modal", name: "quiz" });
              }
            }}
            before={
              storage[info.id] == "complete" ? (
                <Icon28ChecksOutline width={24} height={24} />
              ) : (
                <Icon24LightbulbStarOutline width={24} height={24} />
              )
            }
          >
            {info.quiz ? "Пройти Quiz" : "Quiz, уже скоро..."}
          </Button>
        </Div>
        <body>
          <img
            src={info.src}
            height={"200px"}
            width={"100%"}
            style={{
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />

          <Div>
            <Group>
              <Title level="1" weight="semibold" style={{ marginBottom: 4 }}>
                {info.name}
              </Title>
              <Headline
                weight="regular"
                style={{ marginBottom: 16, color: "#6d6d6d" }}
              >
                {info.subtitle}
              </Headline>
              <Text
                weight="regular"
                style={{
                  marginBottom: 8,
                  fontSize: "20px",
                  lineHeight: "24px",
                  whiteSpace: "pre-line",
                }}
              >
                {info.text}
              </Text>
              <div
                style={{
                  display: "flex",
                }}
              >
                <Button
                  size="l"
                  stretched
                  onClick={() => {
                    goNext({ type: "modal", name: "more" });
                  }}
                >
                  Подробнее
                </Button>
              </div>
            </Group>
          </Div>
        </body>
      </ModalPage>
      <ModalMore
        settlingHeight={100}
        id="more"
        setModal={setModal}
        text={text}
        goBack={goBack}
        info={info}
        map={map}
      />
      <ModalQuiz
        id="quiz"
        setStorage={setStorage}
        storage={storage}
        setModal={setModal}
        user={user}
        text={text}
        goBack={goBack}
        info={info}
        setStorageData={setStorageData}
        map={map}
      />
    </ModalRoot>
  );
};

export { ModalChat };
