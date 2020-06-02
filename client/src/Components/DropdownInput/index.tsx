import React, { ChangeEvent, MouseEvent, FocusEvent } from "react";
import FormInput from "../FormInput";
import IconType from "../Icon/IconTypes";
import Menu from "./Menu";
import IDropdownState from "./IDropdownState";
import Axios from "axios";
import IRestaurant from "../../lib/IRestaurant";
import IDropdownProps from "./IDropdownProps";

export default class RestaurantDropdown extends React.Component<IDropdownProps, IDropdownState> {
    constructor(props: IDropdownProps) {
        super(props);
        this.state = {
            restaurants: [],
            filteredRestaurants: [],
            value: "",
            valid: false,
            focused: false
        };

        this.onChange = this.onChange.bind(this);
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener("click", (event : any) => {
            this.setState({
                focused: this.containedInDropdown(event.target)
            })
        })
    }

    private containedInDropdown(element : HTMLElement | null) : boolean {
        if (!element) {
            return false;
        }else if (element.classList.contains("dropdown")) {
            return true;
        } else {
            return this.containedInDropdown(element.parentElement);
        }
    }

    async componentWillMount() {
        const res = await Axios.get("/restaurant");
        const sortedRestaurants = this.sortRestaurants(res.data.data.restaurants);
        this.setState({
            restaurants: sortedRestaurants,
            filteredRestaurants: sortedRestaurants
        });
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
            <div className="dropdown">
                <FormInput
                    isValid={this.state.valid}
                    value={this.state.value}
                    onChange={this.onChange}
                    type="text" 
                    label="Restaurant"
                    icon={IconType.Menu}
                    placeHolder="Pick where you ate" />
                <Menu 
                    handleMenuClick={this.handleMenuItemClick}
                    visible={this.state.focused && !this.state.valid} 
                    restaurants={this.state.filteredRestaurants} />
            </div>
        )
    }

    private onChange(event : ChangeEvent) {
        let searchedRestaurant = (event.target as HTMLInputElement).value;
        const filteredRestaurants = this.state.restaurants.filter((restaurant) => {
            return restaurant.name.toLowerCase().startsWith(searchedRestaurant.toLowerCase())
        })
        this.setState({
            value: searchedRestaurant,
            filteredRestaurants,
            valid: this.validateInput(searchedRestaurant.toLowerCase())
        }, () => {
            this.props.onChange({
                value: this.state.filteredRestaurants[0],
                valid: this.state.filteredRestaurants.length === 1
            });
        })
    }

    private validateInput(key : string) {
        let start = 0;
        let end = this.state.restaurants.length - 1;
        while (start <= end) {
            let mid = Math.floor((start + end) / 2);
            if (this.state.restaurants[mid].name.toLowerCase() === key) {
                return true;
            } else if (this.state.restaurants[mid].name.toLowerCase() < key) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
        return false;
    }

    private handleMenuItemClick(restaurant : IRestaurant) {
        this.props.onChange({
            value: restaurant,
            valid: true
        })
        this.setState({
            value: restaurant.name,
            valid: true
        })
    }
}