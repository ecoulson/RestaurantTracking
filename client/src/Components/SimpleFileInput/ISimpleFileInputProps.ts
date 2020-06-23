export default interface ISimpleFileInputProps {
    accept?: string[];
    multiple?: boolean;
    onChange: (files : File[]) => void;
}