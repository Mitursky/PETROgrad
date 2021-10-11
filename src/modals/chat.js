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
} from "@vkontakte/vkui";
import styled from "styled-components";
import { useEffect, useState, Fragment } from "react";
import { Icon24Cancel, Icon24Done } from "@vkontakte/icons";
import React from "react";
import "../css/ModalRoot.css";
import { Socket } from "socket.io";
import { tSEnumDeclaration } from "@babel/types";
import "../css/ModalPageHeader.css";
let flyBack;
const ModalChat = ({
  modal,
  setModal,
  socket,
  text,
  setText,
  platformSign,
  info,
  map,
}) => {
  const platform = usePlatform();
  const [msg, setMsg] = useState([]);
  const [UPD, setUPD] = useState();
  const [user, setUser] = useState({});
  window.text = text;
  window.user = user;

  useEffect(() => {
    flyBack = () => {
      console.log(info);
      if (info.goBack) {
        map.current.flyTo({
          center: info.goBack.center,
          zoom: info.goBack.zoom,
        });
      }
    };
  });

  console.log(info);
  return (
    <ModalRoot activeModal={modal}>
      <ModalPage
        id="info"
        onClose={() => {
          setModal(null);
          flyBack();
        }}
        header={
          <ModalPageHeader
            left={
              <body
                style={{
                  marginTop: "145px",
                }}
              >
                {/* <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    marginTop: "150px",
                    left: "0%",
                    boxShadow:
                      "0px -34px 47px -5px rgba(255, 255, 255, 1) inset",
                  }}
                /> */}
                <img
                  src={info.src}
                  height={"200px"}
                  width={window.innerWidth + "px"}
                  style={{
                    borderRadius: "16px 16px 0px 0px",
                    objectFit: "cover",
                  }}
                />
              </body>
            }
          ></ModalPageHeader>
        }
        settlingHeight={50}
      >
        <div style={{ height: "145px" }} />
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
              style={{ marginBottom: 16, fontSize: "20px", lineHeight: "24px" }}
            >
              {info.text}
            </Text>
          </Group>
        </Div>
      </ModalPage>
    </ModalRoot>
  );
};

export { ModalChat };
