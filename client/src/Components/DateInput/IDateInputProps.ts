import IFormValue from "../FormInput/IFormValue";

export default interface ITimeInputProps {
    onChange: (date: IFormValue<string>) => void;
    dark?: boolean;
    iconColor?: string;
    id: string;
    hoverColor?: string;
}