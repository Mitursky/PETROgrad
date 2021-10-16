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
import { Icon24Cancel, Icon28LocationMapOutline } from "@vkontakte/icons";
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
  geodata,
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
              <Fragment>
                {(platform === ANDROID || platform === VKCOM) && (
                  <PanelHeaderButton
                    onClick={() => {
                      setModal(null);
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
                      setModal(null);
                      flyBack();
                    }}
                  >
                    Закрыть
                  </PanelHeaderButton>
                )}
              </Fragment>
            }
          >
            Дворец
          </ModalPageHeader>
        }
      >
        <body>
          <img
            src={info.src}
            height={"200px"}
            width={window.innerWidth + "px"}
            style={{
              objectFit: "cover",
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
                  marginBottom: 16,
                  fontSize: "20px",
                  lineHeight: "24px",
                }}
              >
                {info.text}
              </Text>
            </Group>
          </Div>
          <FixedLayout
            vertical="top"
            style={{
              display: "flex",
              height: "48px",
              marginTop: "60px",
            }}
          >
            <Button
              size="l"
              before={<Icon28LocationMapOutline width={24} height={24} />}
              style={{
                boxShadow: "0px 0px 10px 5px rgb(73 133 204 / 20%)",
                marginLeft: 8 + "px",
              }}
              onClick={() => {
                let a = document.createElement("a");
                Object.assign(a, {
                  href: `https://www.google.com/maps/dir/?api=1&origin=${
                    geodata && geodata.lat
                      ? geodata.lat + "," + geodata.long
                      : ""
                  }&destination=${info.center[1]},${
                    info.center[0]
                  }&zoom=20&travelmode=transit`,
                  target: "_blank",
                });
                a.click();
              }}
            >
              Маршрут
            </Button>
          </FixedLayout>
        </body>
      </ModalPage>
    </ModalRoot>
  );
};

export { ModalChat };
