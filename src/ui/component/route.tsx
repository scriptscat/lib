import React from "react";
import {
  Link,
  LinkProps,
  Outlet,
  RouteObject,
  RouterProvider,
  createHashRouter,
  createMemoryRouter,
} from "react-router-dom";

export type Route = {
  path: string;
  render: () => JSX.Element[] | JSX.Element;
};

const Router: { [key: string]: any } = {};

Router.createRouter = (routes: RouteObject[], opts?: any) => {
  return createMemoryRouter(routes, opts);
};

Router.Outlet = () => {
  return <Outlet />;
};

Router.RouterProvider = (props: any) => {
  return <RouterProvider {...props} />;
};

Router.Link = (text: JSX.Element, props?: LinkProps) => {
  // @ts-ignore
  return <Link {...props}>{text}</Link>;
};

export default Router;
