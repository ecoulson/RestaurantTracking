import { MouseEvent, FormEvent } from "react";

export default interface IFormProps {
    id?: string;
    onClick?: (event : MouseEvent) => void;
    onSubmit?: (event : FormEvent) => void;
    isSubmitting?: boolean;
}