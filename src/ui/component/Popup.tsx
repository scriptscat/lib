import { Message, Modal, Notification } from "@arco-design/web-react";
import UIPage, { UIPageOptions } from "../page";
// @ts-ignore
import arcoCss from "../arco.css";

class Popup extends HTMLElement {
  options: UIPageOptions;

  constructor() {
    super();
    // @ts-ignore
    this.options = {};
    this.options.render = () => {
      const [useMessage, messageContext] = Message.useMessage();
      const [useModal, modalContext] = Modal.useModal();
      const [useNotification, notificationContext] =
        Notification.useNotification();
      //@ts-ignore
      Object.assign(globalThis.CAT_UI, {
        Message: useMessage,
        Modal: useModal,
        Notification: useNotification,
      });
      return (
        <div>
          {messageContext}
          {notificationContext}
          {modalContext}
        </div>
      );
    };
    this.options.style = arcoCss as unknown as string;

    UIPage.render(this);
  }
}

export default Popup;
