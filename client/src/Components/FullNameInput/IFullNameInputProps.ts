import FormValue from "../FormInput/FormValue";

export default interface IFullNameInputProps {
    dark?: boolean;
    iconColor?: string;
    onChange: (fullname: FormValue<string[]>) => void;
    id?: string;
}