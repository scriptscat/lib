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
      const [useModal, modalContext] = Modal.useModal();
      const [useNotification, notificationContext] =
        Notification.useNotification();
      Object.assign(window.CAT_UI, {
        Message: useMessage,
        Modal: useModal,
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
