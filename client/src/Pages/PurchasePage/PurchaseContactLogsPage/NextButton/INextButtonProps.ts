export default interface INextButtonProps {
    onClick: (page : number) => void;
    onSubmit: () => void;
    page: number;
    setCheckoutMode: () => void;
    setShopMode: () => void;
}