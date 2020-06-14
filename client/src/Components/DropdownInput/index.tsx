import React from "react";
import FormInput from "../FormInput";
import IconType from "../Icon/IconTypes";
import Menu from "./Menu";
import IDropdownState from "./IDropdownState";
import Axios from "axios";
import IRestaurant from "../../lib/IRestaurant";
import IDropdownProps from "./IDropdownProps";
import IFormValue from "../FormInput/IFormValue";
import Toast from "../Toast";

export default class RestaurantDropdown extends React.Component<IDropdownProps, IDropdownState> {
    constructor(props: IDropdownProps) {
        super(props);
        this.state = {
            restaurants: [],
            filteredRestaurants: [],
            value: "",
            valid: false,
            focused: false,
            errorMessage: ""
        };

        this.onChange = this.onChange.bind(this);
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
        this.documentClickListener = this.documentClickListener.bind(this);
    }

    componentDidMount() {
        document.addEventListener("click", this.documentClickListener)
    }

    documentClickListener(event : any) {
        this.setState({
            focused: this.containedInDropdown(event.target)
        })
    }


    componentWillUnmount() {
        document.removeEventListener("click", this.documentClickListener)
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
        try {
            const res = await Axios.get("/restaurant");
            if (res.data.success) {
                const sortedRestaurants = this.sortRestaurants(res.data.data.restaurants);
                this.setState({
                    restaurants: sortedRestaurants,
                    filteredRestaurants: sortedRestaurants
                });
            } else {
                this.setState({
                    errorMessage: "Failed to get restaurants"
                })
            }
        } catch (error) {
            this.setState({
                errorMessage: "Failed to get restaurants"
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
            <div className="dropdown">
                <Toast message={this.state.errorMessage} />
                <FormInput
                    disabled={this.state.restaurants.length === 0}
                    isValid={this.state.valid}
                    value={this.state.value}
                    onChange={this.onChange}
                    dark={this.props.dark}
                    type="text" 
                    label="Restaurant"
                    icon={IconType.Menu}
                    placeHolder="Pick where you ate" />
                <Menu 
                    handleMenuClick={this.handleMenuItemClick}
                    visible={this.isVisible()} 
                    restaurants={this.state.filteredRestaurants} />
            </div>
        )
    }

    private isDisabled() {
        return this.state.restaurants.length === 0;
    }

    private isVisible() {
        return this.state.focused && !this.state.valid && !this.isDisabled();
    }

    private onChange(restaurantName : IFormValue<string>) {
        const filteredRestaurants = this.state.restaurants.filter((restaurant) => {
            return restaurant.name.toLowerCase().startsWith(restaurantName.value.toLowerCase())
        })
        this.setState({
            value: restaurantName.value,
            filteredRestaurants,
            valid: this.validateInput(restaurantName.value.toLowerCase())
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