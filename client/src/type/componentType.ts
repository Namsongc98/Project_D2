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

type InputFileHook = {
  valueImg: File | string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  avatarView?: string;
  errorImg?: string;
  setValueImg: React.Dispatch<React.SetStateAction<string | File>>;
};

type InputFile = {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

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

type SelectOptionType = {
  label: string,
  value: string,
}

interface IFormRegister extends IFormInput {
  confirmPassword: string;
}

interface IChangePasswordSubmit {
  oldPassword: string
  newPassword: string
}
interface IChangePassword extends IChangePasswordSubmit {
  confirmNewPassword: string
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
  IChangePasswordSubmit
};
