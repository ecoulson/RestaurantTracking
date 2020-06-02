import React from "react";
import Logo from "../Logo";
import Instructions from "../Instructions";
import Form from "../Form";
import FormInput from "../FormInput";
import IconType from "../Icon/IconTypes";
import Submit from "../Submit";
import GeneralTitle from "../GeneralTitle";
import RestaurantDropdown from "../FormInput/Dropdown";


export default class GeneralPage extends React.Component {
    render() {
        return (
            <>
                <Logo />
                <Form>
                    <GeneralTitle />
                    <RestaurantDropdown />
                    <FormInput 
                        icon={IconType.Clock} 
                        label="Time of Entry" 
                        placeHolder="MM:DD:YYYY hh:mm AM/PM" 
                        type="text" />
                    <Instructions>Please enter one of the following:</Instructions>
                    <FormInput 
                        icon={IconType.Mail} 
                        label="email" 
                        placeHolder="Enter email here" 
                        type="email" />
                    <p className="or">Or</p>
                    <FormInput 
                        icon={IconType.Phone} 
                        label="phone"
                        placeHolder="Enter phone number here" 
                        type="tel" />
                    <Submit />
                </Form>
            </>
        )
    }
}