
 type Layout = {
    path: string;
    component: React.FC | (() => JSX.Element | React.ReactNode);
    layout: boolean;
}[]

export type {Layout}