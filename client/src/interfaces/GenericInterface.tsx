import { ValidationRule } from "react-hook-form";

export interface IResponse {
    msg_es: string;
    msg_en: string;
}

export interface IUser {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    repassword?: string;
}

export interface IValidations {
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: ValidationRule<RegExp>;
}