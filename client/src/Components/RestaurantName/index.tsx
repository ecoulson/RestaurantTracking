import React from "react";
import IRestaurantNameState from "./IRestaurantNameState";
import Axios from "axios";
import "./RestaurantName.css";

export default class RestaurantName extends React.Component<{}, IRestaurantNameState> {
    constructor(props : any) {
        super(props)
        this.state = {
            name: ""
        }
    }

    async componentWillMount() {
        this.getRestaurantName();
    }

    render() {
        return <h1 className="restaurant-name">{this.state.name}</h1>
    }

    async getRestaurantName() {
        const restaurantId = new URLSearchParams(window.location.search).get("restaurantId");
        if (!restaurantId) {
            this.setState({
                name: "ERROR"
            });
        } else {
            try {
                const response = await Axios.get(`/restaurant/${restaurantId}/`);
                this.setState({
                    name: response.data.data.restaurant.name
                })
            } catch (error) {
                this.setState({
                    name: "ERROR"
                })
            }
        }
    }
}