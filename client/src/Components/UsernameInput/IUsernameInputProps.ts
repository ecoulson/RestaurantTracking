import FormValue from "../FormInput/FormValue";

export default interface IUsernameInputProps {
    dark? : boolean;
    iconColor? : string;
    id?: string;
    registering?: boolean;
    onChange : (username : FormValue<string>) => void;
}