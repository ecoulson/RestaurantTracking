import ICreditCard from "../../lib/ICreditCard";

export default interface ICreditCardInputProps {
    onChange: (card : ICreditCard) => void;
}