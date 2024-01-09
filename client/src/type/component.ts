

type ButomType = {
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className: string
};

type InputHook = {
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => string;
};

type InputFileHook = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  avatarView: string
}
type InputType = {
  type: string;
  title: string;
  placeholder: string;
  label: string | undefined;
  value?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => string;
  register?: unknown
  className: string

};

interface IFormRegister extends IFormInput {
  confirmPassword: string;
}

interface IFormInput {
  email: string;
  password: string;
}

export type { ButomType, InputHook, InputType, IFormInput, IFormRegister, InputFileHook };
