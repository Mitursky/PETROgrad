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
  Spacing,
  withModalRootContext,
} from "@vkontakte/vkui";
import styled from "styled-components";
import { useEffect, useState, Fragment } from "react";
import {
  Icon24Cancel,
  Icon28DoneOutline,
  Icon24Back,
  Icon24StoryOutline,
  Icon28CheckCircleFill,
  Icon28CancelCircleFillRed,
  Icon24ArrowRightSquareOutline,
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
import background from "../img/story.png";
import camera_200 from "../img/camera_200.png";
import bridge from "@vkontakte/vk-bridge";

let flyBack;
let collect_right = 0;
let isDesktop =
  window.location.search.split("vk_platform=")[1].split("&")[0] ==
  "desktop_web";
function answer(ans, data) {
  document.getElementById("yes").style.opacity = 0;
  document.getElementById("yes").zIndex = 10;
  document.getElementById("no").zIndex = 10;
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
  user,
}) => {
  const platform = usePlatform();

  const [inputValue, setInputValue] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const makeStory = () => {
    const canvas = document.createElement("canvas");

    if (!canvas.getContext) return;

    canvas.height = 1920;
    canvas.width = 1080;
    const ctx = canvas.getContext("2d");

    document.fonts.load('55pt "Times New Roman"').then(() => {
      const img = new Image();
      const ava = new Image();
      ava.crossOrigin = "anonymous";
      const circle = new Image();

      ava.onload = () => {
        ctx.drawImage(circle, 820, 600, 200, 200);
        ctx.globalCompositeOperation = "source-in";

        ctx.drawImage(ava, 820, 600, 200, 200);
        ctx.globalCompositeOperation = "destination-over";

        ctx.font =
          (collect_right < 2 ? "45pt " : "55pt ") + '"Times New Roman Bold"';
        ctx.fontWeight = "Bold";
        ctx.lineHeight = "69px";

        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = "white";
        ctx.fillText(
          collect_right >= 5
            ? "превосходно!"
            : collect_right >= 4
            ? "приемлемо"
            : collect_right >= 2
            ? "отвратно"
            : "возмутительно!",
          685,
          820
        );
        ctx.drawImage(img, 0, 0);

        bridge.send("VKWebAppShowStoryBox", {
          background_type: "image",
          blob: canvas.toDataURL(),
          locked: true,
          attachment: {
            text: "go_to",
            type: "url",
            url: "https://vk.com/app7968155",
          },
        });
      };
      circle.onload = () =>
        (ava.src =
          user.photo_200 !== "https://vk.com/images/camera_200.png"
            ? user.photo_200
            : camera_200);
      console.log(user);
      img.onload = () =>
        (circle.src =
          "data:image/png;base64,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");

      img.src = background;
    });
  };
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

  if (slideIndex == 0) {
    collect_right = 0;
  }
  // useEffect(() => {
  //   const listener = (event) => {
  //     if (event.code === "Enter" || event.code === "NumpadEnter") {
  //       console.log("Enter key was pressed. Run your function.");
  //       event.preventDefault();
  //       answer(
  //         document.getElementById("input" + slideIndex).value,
  //         info.quiz[slideIndex]
  //       );
  //       setSlideIndex(slideIndex + 1);
  //       // callMyFunction();
  //     }
  //   };
  //   document.addEventListener("keydown", listener);
  //   return () => {
  //     document.removeEventListener("keydown", listener);
  //   };
  // });

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
      dynamicContentHeight
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
      <body
        id="yes"
        style={{
          width: "100%",
          position: "absolute",
          zIndex: "10",
          opacity: "0",
          pointerEvents: "none",
          display: "flex",
          justifyContent: "center",
          top: "40%",
        }}
      >
        <Icon28CheckCircleFill width={80} height={80} />
      </body>
      <body
        id="no"
        style={{
          width: "100%",
          position: "absolute",
          zIndex: "10",
          opacity: "0",
          pointerEvents: "none",
          display: "flex",
          justifyContent: "center",
          top: "40%",
        }}
      >
        <Icon28CancelCircleFillRed width={80} height={80} />
      </body>

      <Group style={{ textAlign: "center" }}>
        <Gallery
          slideWidth="100%"
          align="center"
          style={{
            height: "auto",
            userSelect: "none",
            webkitUserSelect: "none",
          }}
          slideIndex={slideIndex}
          onChange={(slideIndex) => setSlideIndex(slideIndex)}
          isDraggable={false}
          showArrows={false}
        >
          {info.quiz.map((data, index) => {
            return (
              <div style={{ cursor: "default" }}>
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
                  <FormItem
                    style={{
                      width: "250px",
                      margin: "auto",
                      display: "flex",
                      height: "40px",
                    }}
                  >
                    <Input
                      placeholder="Ответ"
                      id={"input" + index}
                      type={data.input}
                      min={0}
                      onKeyPress={(event) => {
                        if (event.key === "Enter" && inputValue) {
                          event.preventDefault();
                          answer(inputValue, data);
                          setInputValue(null);
                          setSlideIndex(slideIndex + 1);
                        }
                        if (data.input !== "text" && !/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      onChange={(event) => {
                        setInputValue(event.target.value.trim());
                      }}
                    />
                    <Button
                      size="m"
                      before={<Icon24ArrowRightSquareOutline />}
                      style={{ marginLeft: "8px" }}
                      disabled={!inputValue}
                      onClick={() => {
                        if (inputValue) {
                          answer(inputValue, data);
                          setInputValue(null);
                          setSlideIndex(slideIndex + 1);
                        }
                      }}
                    ></Button>
                  </FormItem>
                ) : (
                  <FormItem
                    style={{
                      width: "250px",
                      margin: "auto",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
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
                            width: "fit-content",
                          }}
                        >
                          {data_ans}
                        </Button>
                      );
                    })}
                  </FormItem>
                )}
                <Spacing size="16px" />
              </div>
            );
          })}
          <div style={{ cursor: "default" }}>
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
                width: "100%",
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
            <Button
              size="m"
              onClick={() => {
                makeStory();
              }}
              before={<Icon24StoryOutline width="20" height="20" />}
              style={{
                marginTop: "25px",
                borderRadius: "16px",
                marginLeft: "8px",
              }}
            >
              В историю
            </Button>
            <br />
            <Button
              size="m"
              mode="outline"
              before={<Icon28ReplayOutline width="20" height="20" />}
              style={{ marginTop: "8px", borderRadius: "16px" }}
              onClick={() => {
                for (let i = 0; i < info.quiz.length; i++) {
                  if (document.getElementById("input" + i)) {
                    document.getElementById("input" + i).value = "";
                  }
                }
                setInputValue(null);
                setSlideIndex(0);
              }}
            >
              Пройти ещё раз
            </Button>
            <Spacing size="16px" />
          </div>
        </Gallery>
      </Group>
    </ModalPage>
  );
};

export default withModalRootContext(ModalQuiz);
