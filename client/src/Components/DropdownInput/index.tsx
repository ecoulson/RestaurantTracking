import React, { ChangeEvent } from "react";
import FormInput from "../FormInput";
import IconType from "../Icon/IconTypes";
import Menu from "./Menu";

export default class RestaurantDropdown extends React.Component {
    render() {
        return (
            <div className="dropdown">
                <FormInput
                    isValid={false}
                    value=""
                    onChange={this.onChange}
                    type="text" 
                    label="Restaurant"
                    icon={IconType.Menu}
                    placeHolder="Pick where you ate" />
                <Menu restaurants={[]} />
            </div>
        )
    }

    private onChange(event : ChangeEvent) {
        console.log(event);
    }
}