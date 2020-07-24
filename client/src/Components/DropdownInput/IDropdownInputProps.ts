export default interface IDropdownInputProps {
    values: string[]
    onChange: (value: string, index: number) => void;
}