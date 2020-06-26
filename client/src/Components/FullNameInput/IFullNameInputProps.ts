import FormValue from "../FormInput/FormValue";

export default interface IFullNameInputProps {
    dark?: boolean;
    iconColor?: string;
    onChange: (fullName: FormValue<string[]>) => void;
    id?: string;
    value?: string[];
}