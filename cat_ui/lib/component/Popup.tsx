import { Message, Modal, Notification } from "@arco-design/web-react";
import UIPage, { UIPageOptions } from "../page";
// @ts-ignore
import arcoCss from "../arco.css";
import { Fragment } from "react";

class Popup extends HTMLElement {
  options: UIPageOptions;

  constructor() {
    super();
    const render = () => {
      const [useMessage, messageContext] = Message.useMessage();
      const [useNotification, notificationContext] =
        Notification.useNotification();

      const [useModal, modalContext] = Modal.useModal();
      const { confirm, info, success, warning, error } = Modal;
      const rawModal = { raw: { confirm, info, success, warning, error } };
      Object.assign(window.CAT_UI, {
        Message: useMessage,
        Modal: Object.assign(window.CAT_UI.Modal, Modal, useModal, rawModal),
        Notification: useNotification,
      });
      return (
        <Fragment>
          {messageContext}
          {notificationContext}
          {modalContext}
        </Fragment>
      );
    };
    const appendStyle = `.container {
      z-index: 1000000;
    }`;
    const style = arcoCss as unknown as string;
    this.options = {
      render,
      style: style + appendStyle, //待优化？
      zIndex: false,
    };
    UIPage.render(this);
  }
}

export default Popup;
