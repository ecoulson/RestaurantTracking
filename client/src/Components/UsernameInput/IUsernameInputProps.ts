import FormValue from "../FormInput/FormValue";

export default interface IUsernameInputProps {
    dark? : boolean;
    iconColor? : string;
    id: string;
    value?: string;
    hoverColor?: string;
    registering?: boolean;
    whitelist? : string[]
    onChange : (username : FormValue<string>) => void;
}