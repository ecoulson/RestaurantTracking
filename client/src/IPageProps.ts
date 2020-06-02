import ApplicationState from "./Page";

export default interface IPageProps {
    restaurantId?: string;
    setPage?: (status: ApplicationState) => void;
    setRestaurantName?: (restaurantName : string) => void;
}