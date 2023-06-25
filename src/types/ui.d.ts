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
}
