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
  SimpleCell,
  PanelHeaderButton,
  FixedLayout,
} from "@vkontakte/vkui";
import styled from "styled-components";
import { useEffect, useState, Fragment } from "react";
import {
  Icon24Cancel,
  Icon28LocationMapOutline,
  Icon24Back,
  Icon24LightbulbStarOutline,
} from "@vkontakte/icons";
import React from "react";
import "../css/ModalRoot.css";
import { Socket } from "socket.io";
import { tSEnumDeclaration } from "@babel/types";
import "../css/ModalPageHeader.css";
import "../styles.css";
let flyBack;
let isDesktop =
  window.location.search.split("vk_platform=")[1].split("&")[0] ==
  "desktop_web";
const ModalMore = ({ setModal, text, info, map, goBack }) => {
  const platform = usePlatform();
  const [msg, setMsg] = useState([]);
  const [UPD, setUPD] = useState();
  const [user, setUser] = useState({});
  window.text = text;
  window.user = user;
  console.log(info);

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
      id="more"
      onClose={() => {
        goBack();
      }}
      settlingHeight={"100"}
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
          Информация
        </ModalPageHeader>
      }
    >
      <Avatar
        size={100}
        style={{
          display: "block",

          marginLeft: isDesktop
            ? 213 - 50 + "px"
            : window.innerWidth / 2 - 54 + "px",
        }}
        src={info.src}
      />
      <Div style={{ marginTop: "-4px", padding: "0px" }}>
        <Group style={{ marginLeft: "0px", marginRight: "0px", width: "100%" }}>
          <Text
            weight="regular"
            style={{
              marginBottom: 8,
              fontSize: "16px",
              lineHeight: "24px",
              whiteSpace: "pre-line",
            }}
          >
            {info.more
              ? info.more
              : "Подробное описание появится совсем скоро!"}
          </Text>
        </Group>
      </Div>
    </ModalPage>
  );
};

export { ModalMore };
