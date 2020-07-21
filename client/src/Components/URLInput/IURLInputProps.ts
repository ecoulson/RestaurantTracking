import IFormValue from "../FormInput/IFormValue";

export default interface IURLInputProps {
    onChange : (url : IFormValue<string>) => void;
    dark? : boolean;
    iconColor?: string; 
    hoverColor?: string;
    value? : string;
    photo? : boolean;
    id: string;
}