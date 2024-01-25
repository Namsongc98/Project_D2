import { ReactNode } from "react";
import { Role } from ".";


type Layout = {
    id: number,
    path: string;
    component: React.FC | (() => JSX.Element | React.ReactNode);
    layout: boolean;
    role?: Role
    children?: boolean
}[]

type PathType = {
    id: number,
    path: string,
    icon: ReactNode,
    title: string
}

export type { Layout, PathType }