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
};

type checkboxType = {
  checkbox: string[] | number[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  value: number | string;
};

type SelectOptionType = {
  label: string | number;
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
};
