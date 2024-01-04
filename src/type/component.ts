

type ButomType = {
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  children: React.ReactNode;
  onClicK?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

type InputHook = {
  value: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => string;
};
type InputType = {
  type: string;
  title: string;
  placeholder: string;
  label: "email" | "password" | "confirmPassword";
  value?: string;
  onchange?: (e: React.FormEvent<HTMLInputElement>) => string;
  register?: unknown
};

interface IFormRegister extends IFormInput {
  confirmPassword: string;
}

interface IFormInput {
  email: string;
  password: string;
}

export type { ButomType, InputHook, InputType, IFormInput, IFormRegister };
