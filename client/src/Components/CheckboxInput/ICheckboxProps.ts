export default interface ICheckboxProps {
    label: string;
    checked?: boolean;
    onChange: (value: boolean) => void;
}