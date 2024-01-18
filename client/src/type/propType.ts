import { AlertColor } from "@mui/material";
import {
  IProfileUser,
  ImageMultiple,
  PathType,
  SelectOptionType,
  StatusApi,
  typeGetRoom,
} from ".";
import { Dayjs } from "dayjs";

type PropsLayout = {
  children: React.ReactNode;
};

type PropsSelect = {
  value?: string | number;
  options?: SelectOptionType[];
  onChange?: any;
  label?: string | number;
  register?: unknown;
  field?: string;
  defaultValue?: string | number;
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
  imageRoom: ImageMultiple;
};

type PropTypeSnackBar = {
  type: AlertColor;
  message: string;
};
type PropAppBarType = {
  toggleDrawer: () => void;
  open: boolean;
};
type PropDrawerType = {
  toggleDrawer: () => void;
  open: boolean;
  paths: Array<PathType>;
};

type PropsRoom = {
  data: typeGetRoom[];
};

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
  PropTypeSnackBar,
  PropAppBarType,
  PropDrawerType,
  PropsRoom,
};
