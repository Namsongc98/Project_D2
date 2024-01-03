import { UseFormRegister } from "react-hook-form";

type ButomType = {
    type: "submit" | "reset" | "button" | undefined;
    // disabled: boolean;
    children: React.ReactNode;
    // onClicK: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

type Input = {
    value: string;
    handleChange: (e: React.FormEvent<HTMLInputElement>) => string;
};
type InputType = {
    type: string;
    label: string;
    placeholder: string;
    name: "email" | "password" | "confirmPassword";
    value?: string;
    onchange?: (e: React.FormEvent<HTMLInputElement>) => string;
    register: UseFormRegister<IFormInput>
};

interface IFormInput {
    email: string;
    password: string;
    confirmPassword: string;
  }

export type { ButomType, Input, InputType,IFormInput } 