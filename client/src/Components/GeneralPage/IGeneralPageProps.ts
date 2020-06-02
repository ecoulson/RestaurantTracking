import ApplicationState from "../../Page";

export default interface IGeneralPageProps {
    setPage: (state : ApplicationState) => void;
    setRestaurantName: (restaurantName : string) => void;
}