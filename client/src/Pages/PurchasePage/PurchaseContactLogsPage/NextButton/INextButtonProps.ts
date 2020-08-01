export default interface INextButtonProps {
    onClick: (page : number) => void;
    onSubmit: () => void;
    canProgress: () => boolean;
    page: number;
    setCheckoutMode: () => void;
    setShopMode: () => void;
}