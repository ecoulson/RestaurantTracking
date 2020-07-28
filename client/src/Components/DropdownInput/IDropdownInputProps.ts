export default interface IDropdownInputProps {
    values: string[];
    id: string;
    label: string;
    onChange: (value: string, index: number) => void;
}