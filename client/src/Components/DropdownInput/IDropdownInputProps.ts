export default interface IDropdownInputProps {
    values: string[];
    id: string;
    label: string;
    value?: string;
    onChange: (value: string, index: number) => void;
}