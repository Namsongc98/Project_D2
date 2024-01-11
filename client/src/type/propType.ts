import { SelectOptionType, StatusApi } from ".";

type Props = {
    children: React.ReactNode;
};

type PropsSelect = {
    value?: string | number;
    options: SelectOptionType[];
    onChange: any;
    label: string
};



type ToastProp = {
    status: StatusApi
}

type PropChangePassword = {
    handleOpen: () => void;
    open: boolean;
};

type PropsPopup = {
    setAnchor: React.Dispatch<React.SetStateAction<null | HTMLElement>>,
    anchor: null | HTMLElement,
    children: React.ReactNode,
}

export type { Props, PropsSelect, ToastProp, PropChangePassword, PropsPopup } 