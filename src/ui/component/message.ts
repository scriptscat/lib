import { Message as ArcoMessage } from "@arco-design/web-react";
import { messageFuncType } from "@arco-design/web-react/es/Message/useMessage";
import UIPage, { UIPageOptions } from "../page";
// @ts-ignore
import arcoCss from "../arco.css";

const messageElName = "cat-ui-message";
let arcoMessage: messageFuncType;

class Message extends HTMLElement {
  options: UIPageOptions;

  constructor() {
    super();
    // @ts-ignore
    this.options = Message.options || {};
    this.options.render = () => {
      const [message, contextHolder] = ArcoMessage.useMessage();
      arcoMessage = message;
      // @ts-ignore
      this.options.onReady && this.options.onReady();
      return contextHolder;
    };
    this.options.style = arcoCss as unknown as string;

    UIPage.render(this);
  }

  protected static init() {
    if (document.body.querySelector(messageElName)) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      // @ts-ignore
      Message.options = {
        onReady() {
          resolve();
        },
      };
      let div = document.createElement("div");
      div.innerHTML = "<" + messageElName + " />";
      document.body.append(div);
    });
  }

  static async info(text: string) {
    await this.init();
    arcoMessage.info && arcoMessage.info(text);
  }

  static async error(text: string) {
    await this.init();
    arcoMessage.error && arcoMessage.error(text);
  }

  static async normal(text: string) {
    await this.init();
    arcoMessage.normal && arcoMessage.normal(text);
  }

  static async warning(text: string) {
    await this.init();
    arcoMessage.warning && arcoMessage.warning(text);
  }

  static async success(text: string) {
    await this.init();
    arcoMessage.success && arcoMessage.success(text);
  }
}

customElements.define(messageElName, Message);
export default Message;
