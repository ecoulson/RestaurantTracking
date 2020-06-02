import React from "react";
import FormInput from "..";
import IconType from "../../Icon/IconTypes";
import Menu from "./Menu";

export default class RestaurantDropdown extends React.Component {
    render() {
        return (
            <div className="dropdown">
                <FormInput 
                    type="text" 
                    label="Restaurant"
                    icon={IconType.Menu}
                    placeHolder="Pick where you ate" />
                <Menu restaurants={[]} />
            </div>
        )
    }
}