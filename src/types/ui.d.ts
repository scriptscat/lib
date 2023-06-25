// ui.d.ts

interface MutableRefObject<T> {
  current: T;
}

declare type UIPageOptions = {
  style?: string;
  render: () => JSX.Element[] | JSX.Element;
};

declare class UIPage extends HTMLElement {
  static render(_this: UIPage): void;
  options: UIPageOptions;
  constructor();
}

declare type UIPlanOptions = UIPageOptions & {
  appendStyle?: string;
  min?: boolean;
  point?: {
    x: number;
    y: number;
  };
  header?: {
    title?: string;
  };
  footer?: {
    version?: string;
  };
  onReady?: (plan: UIPlan) => void;
};

declare class UIPlan extends HTMLElement {
  options: UIPlanOptions;
  static DefaultHeader(props: {
    title: string;
    plan: MutableRefObject<HTMLElement | undefined>;
  }): JSX.Element;
  static DefaultFooter(child?: JSX.Element): JSX.Element;
  onDraggableStop(callback: (event: { x: number; y: number }) => void);
}

declare type CSSProperties = {
  [key: string]: string | number | CSSProperties;
};

declare type MessageProps = {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 消息弹出动画的类名，见 react-transition-group 的 `classNames`
   * @en ClassNames of react-transition-group of the message pop-up animation, see `classNames`
   */
  transitionClassNames?: string;
  /**
   * @zh 动画持续时间，见 react-transition-group 的 `timeout`
   * @en timeout of `react-transition-group` of the message pop-up animation, see `timeout`
   * @defaultValue {enter: 100, exit: 300}
   * @version 2.43.0
   */
  transitionTimeout?: {
    enter?: number;
    exit?: number;
  };
  /**
   * @zh 消息内容
   * @en Message content
   */
  content: string;
  /**
   * @zh 是否显示图标
   * @en Whether to show the icon
   * @defaultValue true
   */
  showIcon?: boolean;
  /**
   * @zh 自定义图标
   * @en Custom icon
   */
  icon?: any;
  /**
   * @zh 自动关闭的时间，单位为 `ms`
   * @en Automatic shutdown time, the unit is `ms`
   * @defaultValue 3000
   */
  duration?: number;
  /**
   * @zh 关闭时的回调
   * @en Callback when close
   */
  onClose?: () => void;
  /**
   * @zh 当前消息的唯一标识，可以用来更新消息
   * @en The unique identifier of the current message, which can be used to update the message
   */
  id?: string;
  /**
   * @zh 消息的位置，分为 `top` 上方和 `bottom` 下方
   * @en The position of the message
   */
  position?: "top" | "bottom";
  /**
   * @zh 是否显示关闭按钮
   * @en Whether to show the close button
   */
  closable?: boolean;
  type?: string;
};

declare namespace CAT_UI {
  function create(options: UIPageOptions): void;
  function createPlan(options: UIPlanOptions): void;
  function useState(data?: any): [any, (data: any) => void];
  function Text(child: string): JSX.Element;
  function Input(
    value: string | ((val: string) => void),
    onChange?: (val: string) => void
  ): JSX.Element;
  function Button(child: string, onClick: () => void): JSX.Element;
  namespace Message {
    function info(config: MessageProps | string);
    function success(config: MessageProps | string);
    function warning(config: MessageProps | string);
    function error(config: MessageProps | string);
    function normal(config: MessageProps | string);
  }
}
