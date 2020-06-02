import Logo from '../Logo';
import RestaurantName from '../RestaurantName';
import Instructions from '../Instructions';
import FormInput from '../FormInput';
import Form from '../Form';
import IconType from '../Icon/IconTypes';
import Submit from '../Submit';
import React from "react";

export default class RestaurantPage extends React.Component {
    render() {
        return (
            <>
                <Logo />
                <RestaurantName />
                <Instructions>Please enter one of the following:</Instructions>
                <Form>
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