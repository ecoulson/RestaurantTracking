import { MouseEvent, FormEvent } from "react";

export default interface IFormProps {
    onClick?: (event : MouseEvent) => void;
    onSubmit?: (event : FormEvent) => void;
    isSubmitting: boolean;
}