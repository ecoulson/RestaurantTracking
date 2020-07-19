import React from "react";
import IRestaurantDropdownProps from "./IRestaurantDropdownProps";
import DropdownInput from "../DropdownInput";
import IFormValue from "../FormInput/IFormValue";
import IRestaurant from "../../lib/IRestaurant";
import IRestaurantDropdownStateProps from "./IRestaurantDropdownStateProps";
import Toast from "../Toast";
import ToastType from "../Toast/ToastType";
import { getAllRestaurants } from "../../API";
import IconType from "../Icon/IconTypes";

export default class RestaurantDropdown extends React.Component<IRestaurantDropdownProps, IRestaurantDropdownStateProps> {
    constructor(props: IRestaurantDropdownProps) {
        super(props);
        this.state = {
            values: [],
            filteredValues: [],
            message: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        try {
            const sortedRestaurants = this.sortRestaurants(await getAllRestaurants());
                this.setState({
                    values: sortedRestaurants,
                    filteredValues: sortedRestaurants
                });
        } catch (error) {
            this.setState({
                message: "Failed to get restaurants"
            })
        }
    }

    private sortRestaurants(restaurants : IRestaurant[]) {
        return restaurants.sort((a : any, b : any) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
            return 0;
        }) as IRestaurant[];
    }

    render() {
        return (
            <>
                <Toast type={ToastType.Error} message={this.state.message} />
                <DropdownInput
                    dark={this.props.dark}
                    values={this.state.filteredValues.map((restaurant) => {
                        return restaurant.name
                    })}
                    icon={IconType.Menu}
                    label="Restaurant"
                    placeholder="Enter restaurant to check in to"
                    hoverColor={this.props.hoverColor}
                    iconColor={this.props.iconColor}
                    onChange={this.handleChange} />
            </>
        )
    }

    private handleChange(index : IFormValue<number>) {
        this.props.onChange({
            value: this.state.filteredValues[index.value],
            valid: index.valid
        })
    }
}