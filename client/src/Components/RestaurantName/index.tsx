import React from "react";
import "./RestaurantName.css";

export default class RestaurantName extends React.Component {
    render() {
        return <h1 className="restaurant-name">{this.props.children}</h1>
    }
}