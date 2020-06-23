export default interface ISlideSwitchProps {
    onChange: (id: number) => void;
    optionWidth?: number;
    selected?: number;
}