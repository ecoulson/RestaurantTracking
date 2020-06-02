import IRestaurant from "../../lib/IRestaurant";

export default interface IMenuProps {
    restaurants: IRestaurant[];
    visible: boolean;
    handleMenuClick: (restaurant : IRestaurant) => void;
}