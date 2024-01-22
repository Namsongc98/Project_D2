


type ButonType = {
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
};

type InputHook = {
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

type InputDate = {
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

type InputFileHook = {
  valueImg: File | string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  avatarView?: string;
  errorImg?: string;
  setValueImg: React.Dispatch<React.SetStateAction<string | File>>;
};

type InputFile = {
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  multiple?: boolean;
};

type InputType = {
  type: string;
  title: string;
  placeholder: string;
  label: string | undefined;
  value?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => string;
  register?: unknown;
  className: string;
  required: boolean,
  defaultValue?: string | number
};

type checkboxType = {
  checkbox: string[] | number[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  value: number | string;
};

type SelectOptionType = {
  label?: string | number;
  value: string | number;
};

interface IFormRegister extends IFormInput {
  confirmPassword: string;
}

interface IChangePasswordSubmit {
  oldPassword: string;
  newPassword: string;
}
interface IChangePassword extends IChangePasswordSubmit {
  confirmNewPassword: string;
}

interface IFormInput {
  email: string;
  password: string;
}

type ImageFiles = {
  id: number,
  error: boolean,
  url: string,
  file: File
}

type ImageMultiple = {
  arrImgView: Array<ImageFiles>,
  onChange: (e: React.FormEvent<HTMLInputElement>) => void,
  errorImg: string,
  setArrImgView: React.Dispatch<React.SetStateAction<Array<ImageFiles>>>
}

type TextArea = {
  value?: string,
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  label?: string
  register?: unknown;
  title: string
  required: boolean
}


interface ColumnTable {
  id:
  | "id"
  | "address"
  | "city"
  | "approve_room"
  | "bathroom"
  | "bedroom"
  | "cout_people"
  | "created_at"
  | "decription"
  | "name"
  | "price"
  | "type_tourism";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}


export type {
  ButonType,
  InputHook,
  InputType,
  IFormInput,
  IFormRegister,
  InputFileHook,
  InputFile,
  SelectOptionType,
  IChangePassword,
  IChangePasswordSubmit,
  InputDate,
  checkboxType,
  ImageMultiple,
  ImageFiles,
  TextArea,
  ColumnTable
};
