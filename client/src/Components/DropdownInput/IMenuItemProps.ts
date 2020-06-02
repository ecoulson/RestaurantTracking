import IRestaurant from "../../lib/IRestaurant";

export default interface IMenuItemProps {
    restaurant : IRestaurant;
    onClick: (restaurant : IRestaurant) => void;
}