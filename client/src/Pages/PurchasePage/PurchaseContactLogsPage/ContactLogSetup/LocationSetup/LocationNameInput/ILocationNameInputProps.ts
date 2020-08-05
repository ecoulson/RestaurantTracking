import TextInput from "../../../../../../Components/TextInput";

export default interface ILocationNameInputProps {
    inputRef?: React.RefObject<TextInput>;
    onChange: (value: string) => void;
}