import { AlertColor } from "@mui/material";
import { IProfileUser, ImageMultiple, SelectOptionType, StatusApi } from ".";
import { Dayjs } from "dayjs";

type PropsLayout = {
  children: React.ReactNode;
};

type PropsSelect = {
  value?: string | number;
  options?: SelectOptionType[];
  onChange?: any;
  label?: string | number;
  register?: unknown
  field?: string
  defaultValue?: string | number
};

type ToastProp = {
  status: StatusApi;
};

type AlertValidate = {
  type: AlertColor | undefined;
  message: string;
};

type AlertProp = {
  status: AlertValidate;
};

type PropChangePassword = {
  handleOpen: () => void;
  open: boolean;
  children: React.ReactNode;
};

type PropsPopup = {
  setAnchor: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
  anchor: null | HTMLElement;
  children: React.ReactNode;
};

type PropAvatar = {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  user?: IProfileUser;
  size: number;
};

type PropDatePick = {
  onChange: (newValue: Dayjs | null) => void;
  value: string | undefined;
  label: string;
};

type PropImages = {
  imageRoom: ImageMultiple
}

type PropTypeSnackBar = {
  type: AlertColor,
  message: string
}

export type {
  PropsLayout,
  PropsSelect,
  ToastProp,
  PropChangePassword,
  PropsPopup,
  PropAvatar,
  AlertProp,
  AlertValidate,
  PropDatePick,
  PropImages,
  PropTypeSnackBar
};