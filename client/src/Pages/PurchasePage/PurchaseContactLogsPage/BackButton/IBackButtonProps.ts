export default interface IBackButtonProps {
    onClick: (page : number) => void;
    page: number;
    setCheckoutMode: () => void;
    setShopMode: () => void;
}