import ApplicationState from "../../Page";

export default interface IRestaurantPageProps {
    restaurantId: string;
    setPage: (status: ApplicationState) => void;
    setRestaurantName: (restaurantName : string) => void;
}