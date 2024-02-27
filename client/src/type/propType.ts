import { AlertColor } from "@mui/material";
import {
  IBookingData,
  IProfileUser,
  ImageMultiple,
  PathType,
  SelectOptionType,
  StatusApi,
  TableRoom,
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
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  type: AlertColor | undefined;
  message: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};
type PropAppBarType = {
  toggleDrawer: () => void;
  open: any;
};
type PropDrawerType = {
  toggleDrawer: () => void;
  open: boolean;
  paths: Array<PathType>;
};

type PropsRoom = {
  data: typeGetRoom[];
  getdata: () => void;
  page: number,
  rowsPerPage: number,
  handleChangePage: (event: unknown, newPage: number) => void,
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void,

};


interface PropsBooking {
  data: IBookingData[];
  columns: TableRoom[];
  detail: boolean;
  getData?: () => void;
}

interface PropsUser {
  data: IProfileUser[]
  onClickNav: (idUser: string) => void;
  columns: TableRoom[]
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
  PropTypeSnackBar,
  PropAppBarType,
  PropDrawerType,
  PropsRoom,
  PropsBooking,
  PropsUser
};
