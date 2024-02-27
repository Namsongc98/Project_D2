import { ReactNode } from "react";
import { Role } from ".";

type Layout = {
  id: number;
  path: string;
  component: React.FC | (() => JSX.Element | React.ReactNode);
  layout: boolean;
  role?: Role;
  children?: boolean;
  childrenRole?: "booking" | "user" | "room" | "type" | "detail" | "city" | "host";
}[];

type PathType = {
  id: number;
  path: string;
  icon: ReactNode;
  title: string;
  chilrend?: boolean;
};

export type { Layout, PathType };
