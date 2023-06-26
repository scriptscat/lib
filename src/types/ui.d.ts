// ui.d.ts

import {
  TypographyProps,
  InputProps,
  ButtonProps,
  CheckboxProps,
  SelectProps,
  MessageProps,
  SelectOptionProps,
} from "@arco-design/web-react";

interface MutableRefObject<T> {
  current: T;
}

declare type UIPageOptions = {
  appendStyle?: string;
  style?: string;
  render: () => JSX.Element[] | JSX.Element;
  onReady?: (panel: UIPage) => void;
};

declare class UIPage extends HTMLElement {
  static render(_this: UIPage): void;
  options: UIPageOptions;
  constructor();
}

declare type UIPanelOptions = UIPageOptions & {
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
  onReady?: (panel: UIPanel) => void;
};

declare class UIPanel extends HTMLElement {
  options: UIPanelOptions;
  static DefaultHeader(props: {
    title: string;
    panel: MutableRefObject<HTMLElement | undefined>;
  }): JSX.Element;
  static DefaultFooter(child?: JSX.Element): JSX.Element;
  onDraggableStop(callback: (event: { x: number; y: number }) => void);
}

declare namespace CAT_UI {
  function create(options: UIPageOptions): void;
  function createPanel(options: UIPanelOptions): void;

  function createElement(
    type: string,
    props?: any,
    ...children: React.ReactNode[]
  );

  function useState(data?: any): [any, (data: any) => void];

  function Text(text: string, props?: TypographyProps): JSX.Element;
  function Input(props?: InputProps): JSX.Element;
  function Button(text: string, props?: ButtonProps): JSX.Element;
  function Checkbox(text: string, props?: CheckboxProps): JSX.Element;
  type TSelect = (
    options: JSX.Element[],
    props?: SelectProps
  ) => JSX.Element & {
    Option: (text: string, props?: SelectOptionProps) => JSX.Element;
  };
  const Select: TSelect;
  function Space(element: JSX.Element, props?: SpaceProps);

  namespace Message {
    function info(config: MessageProps | string);
    function success(config: MessageProps | string);
    function warning(config: MessageProps | string);
    function error(config: MessageProps | string);
    function normal(config: MessageProps | string);
  }
}
