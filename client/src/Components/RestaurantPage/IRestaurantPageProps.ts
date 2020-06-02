import ApplicationState from "../../ApplicationState";

export default interface IRestaurantPageProps {
    restaurantId: string;
    setApplicationState: (status: ApplicationState) => void;
}