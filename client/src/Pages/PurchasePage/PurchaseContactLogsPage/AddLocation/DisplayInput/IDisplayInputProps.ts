export default interface IDisplayInputProps {
    displayTypes: string[];
    onChange: (counts: [string, number][]) => void;
}