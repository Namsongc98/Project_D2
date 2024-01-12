
import { AlertColor } from "@mui/material";
import { IProfileUser, SelectOptionType, StatusApi } from ".";

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

type AlertValidate = {
    type: AlertColor | undefined;
    message: string;
}

type AlertProp = {
    status: AlertValidate
}



type PropChangePassword = {
    handleOpen: () => void;
    open: boolean;
    children: React.ReactNode
};

type PropsPopup = {
    setAnchor: React.Dispatch<React.SetStateAction<null | HTMLElement>>,
    anchor: null | HTMLElement,
    children: React.ReactNode,
}

type PropAvatar = {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
    user?: IProfileUser
    size: number
}



export type { Props, PropsSelect, ToastProp, PropChangePassword, PropsPopup, PropAvatar, AlertProp } 