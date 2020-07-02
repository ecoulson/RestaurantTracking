export default interface IMenuProps {
    values: string[];
    visible: boolean;
    handleMenuClick: (index : number) => void;
}