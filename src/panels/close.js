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
  PanelHeader,
  PanelHeaderBack,
  SubnavigationButton,
} from "@vkontakte/vkui";

import { Icon56UsersOutline, Icon56MessageReadOutline } from "@vkontakte/icons";
import { Icon56ServicesOutline } from "@vkontakte/icons";
const ClosePanel = () => {
  return (
    <Placeholder
      icon={<Icon56ServicesOutline />}
      header="Приложение не поддерживается"
      stretched
    >
      Обновите клиент ВКонтакте
    </Placeholder>
  );
};

export default ClosePanel;
