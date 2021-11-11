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
  Gallery,
  Avatar,
  Group,
  Title,
  Button,
  FormItem,
  Input,
  SimpleCell,
  PanelHeaderButton,
  FixedLayout,
} from "@vkontakte/vkui";
import styled from "styled-components";
import { useEffect, useState, Fragment } from "react";
import {
  Icon24Cancel,
  Icon28DoneOutline,
  Icon24Back,
  Icon28ReplayOutline,
} from "@vkontakte/icons";
import React from "react";
import "../css/ModalRoot.css";
import { Socket } from "socket.io";
import { tSEnumDeclaration } from "@babel/types";
import verybad from "../img/verybad.png";
import bad from "../img/bad.png";
import ok from "../img/ok.png";
import best from "../img/best.png";
import "../css/ModalPageHeader.css";
let flyBack;
let collect_right = 0;
let isDesktop =
  window.location.search.split("vk_platform=")[1].split("&")[0] ==
  "desktop_web";
function answer(ans, data) {
  console.log(ans, data);
  document.getElementById("yes").style.opacity = 0;
  document.getElementById("no").style.opacity = 0;
  if (ans == data.answer) {
    collect_right += 1;
    if (document.getElementById("yes")) {
      requestAnimationFrame(() => {
        if (document.getElementById("yes")) {
          document.getElementById("yes").style.opacity = 1;
          window.timeout = 15;
        }
      });
    }
  } else {
    if (document.getElementById("no")) {
      requestAnimationFrame(() => {
        if (document.getElementById("no")) {
          document.getElementById("no").style.opacity = 1;
          window.timeout = 15;
        }
      });
    }
  }
}
const ModalQuiz = ({
  setModal,
  text,
  info,
  map,
  goBack,
  setStorage,
  setStorageData,
  storage,
}) => {
  const platform = usePlatform();
  const [user, setUser] = useState({});
  const [slideIndex, setSlideIndex] = useState(0);
  if (collect_right == 5) {
    document.getElementById(info.id).style.border =
      "solid 5px var(--button_commerce_background)";
    document.getElementById(info.id).style.boxShadow =
      "var(--button_commerce_background) 0px 0px 10px 3px";
    storage[info.id] = "complete";
    setStorage(storage);
    setStorageData(info.id, "complete");
  }
  window.text = text;
  window.user = user;
  if (slideIndex == 0) {
    collect_right = 0;
  }

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
    <ModalPage
      id="quiz"
      onClose={() => {
        goBack();
      }}
      header={
        <ModalPageHeader
          left={
            <Fragment>
              {(platform === ANDROID || platform === VKCOM) && (
                <PanelHeaderButton
                  onClick={() => {
                    goBack();
                  }}
                >
                  <Icon24Back />
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
                  }}
                >
                  Назад
                </PanelHeaderButton>
              )}
            </Fragment>
          }
        >
          Quiz
        </ModalPageHeader>
      }
    >
      <Group style={{ textAlign: "center" }}>
        <Gallery
          slideWidth="100%"
          align="center"
          style={{ height: "100%" }}
          slideIndex={slideIndex}
          onChange={(slideIndex) => setSlideIndex(slideIndex)}
          isDraggable={false}
          showArrows={false}
        >
          {info.quiz.map((data, index) => {
            return (
              <div
                style={{
                  width: isDesktop ? "416px" : window.innerWidth + "px",
                }}
              >
                <Avatar
                  size={80}
                  style={{
                    display: "block",

                    marginLeft: isDesktop
                      ? 416 / 2 - 40 + "px"
                      : window.innerWidth / 2 - 40 + "px",
                  }}
                  src={info.src}
                />
                <Title
                  level="1"
                  weight="semibold"
                  style={{ marginBottom: 4, fontSize: "20px" }}
                >
                  Вопрос {index + 1}/5
                </Title>
                <Text
                  weight="regular"
                  style={{
                    fontSize: "18px",
                    lineHeight: "24px",
                    whiteSpace: "pre-line",
                    margin: "8px",
                  }}
                >
                  {data.question}
                </Text>
                {data.sub_question ? (
                  <Text
                    weight="regular"
                    style={{
                      fontSize: "14px",
                      lineHeight: "18px",
                      whiteSpace: "pre-line",
                      margin: "16px",
                    }}
                  >
                    {data.sub_question}
                  </Text>
                ) : (
                  ""
                )}
                {data.type == "write" ? (
                  <FormItem style={{ width: "250px", margin: "auto" }}>
                    <Input placeholder="Ответ" id={"input" + index} />
                    <Button
                      size="m"
                      style={{ marginTop: "8px", marginBottom: "8px" }}
                      onClick={() => {
                        answer(
                          document.getElementById("input" + index).value,
                          data
                        );
                        setSlideIndex(slideIndex + 1);
                      }}
                    >
                      Ответить
                    </Button>
                  </FormItem>
                ) : (
                  <FormItem
                    style={{
                      width: "250px",
                      margin: "auto",
                      display: "block",
                      marginBottom: "-8px",
                    }}
                  >
                    {data.answers.map((data_ans) => {
                      return (
                        <Button
                          size="m"
                          mode="outline"
                          onClick={() => {
                            answer(data_ans, data);
                            setSlideIndex(slideIndex + 1);
                          }}
                          style={{
                            borderRadius: "50px",
                            marginTop: "8px",
                            marginRight: "4px",
                          }}
                        >
                          {data_ans}
                        </Button>
                      );
                    })}
                  </FormItem>
                )}
              </div>
            );
          })}
          <div
            style={{
              width: isDesktop ? "416px" : window.innerWidth + "px",
            }}
          >
            <Title
              level="1"
              weight="semibold"
              style={{ marginBottom: 4, fontSize: "20px" }}
            >
              Quiz пройден
            </Title>

            <Text
              weight="regular"
              style={{
                fontSize: "18px",
                lineHeight: "24px",
                whiteSpace: "pre-line",
                margin: "8px",
              }}
            >
              Правильных ответов {collect_right}/5
            </Text>
            <img
              style={{
                display: "block",
                marginLeft: isDesktop
                  ? 416 / 2 - 125 + "px"
                  : window.innerWidth / 2 - 125 + "px",
                width: "250px",
                marginTop: "16px",
              }}
              src={
                collect_right >= 5
                  ? best
                  : collect_right >= 4
                  ? ok
                  : collect_right >= 2
                  ? bad
                  : verybad
              }
            />
            <Button
              size="m"
              mode="commerce"
              onClick={() => {
                goBack();
              }}
              before={<Icon28DoneOutline width="20" height="20" />}
              style={{ marginTop: "25px", borderRadius: "16px" }}
            >
              Завершить
            </Button>
            <br />
            <Button
              size="m"
              mode="outline"
              before={<Icon28ReplayOutline width="20" height="20" />}
              style={{ marginTop: "8px", borderRadius: "16px" }}
              onClick={() => {
                setSlideIndex(0);
              }}
            >
              Пройти ещё раз
            </Button>
          </div>
        </Gallery>
      </Group>
    </ModalPage>
  );
};

export { ModalQuiz };
