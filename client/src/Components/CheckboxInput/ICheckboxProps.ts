export default interface ICheckboxProps {
    label: string;
    checked?: boolean;
    dark?: boolean;
    onChange: (value: boolean) => void;
}