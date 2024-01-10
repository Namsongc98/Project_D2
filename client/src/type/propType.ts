import { SelectOptionType } from ".";

type Props = {
    children: React.ReactNode;
};

type PropsSelect = {
    value?: string | number;
    options: SelectOptionType[];
    onChange:  any;
};


export type { Props, PropsSelect } 