import { ReactNode } from "react";


type Layout = {
    path: string;
    component: React.FC | (() => JSX.Element | React.ReactNode);
    layout: boolean;
}[]

type PathType = {
    id: number,
    path: string,
    icon: ReactNode,
    title: string
}

export type { Layout, PathType }