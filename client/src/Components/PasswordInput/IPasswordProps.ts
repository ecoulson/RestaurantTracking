import FormValue from "../FormInput/FormValue";

export default interface IPasswordProps {
    dark?: boolean;
    onChange: (value: FormValue<string>) => void;
    iconColor?: string;
    id: string;
    registering?: boolean;
    placeholder?: string;
    hoverColor?: string;
    label?: string;
}