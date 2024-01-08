

type ButomType = {
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

type InputHook = {
  value: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => string;
};
type InputType = {
  type: string;
  title: string;
  placeholder: string;
  label:  string | undefined;
  value?: string;
  onchange?: (e: React.FormEvent<HTMLInputElement>) => string;
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

export type { ButomType, InputHook, InputType, IFormInput, IFormRegister };
