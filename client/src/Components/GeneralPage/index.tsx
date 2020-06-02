import React, { MouseEvent } from "react";
import Logo from "../Logo";
import Instructions from "../Instructions";
import Form from "../Form";
import Submit from "../Submit";
import GeneralTitle from "../GeneralTitle";
import RestaurantDropdown from "../DropdownInput";
import IGeneralPageState from "./IGeneralPageState";
import EmailInput from "../EmailInput";
import IEmail from "../EmailInput/IEmail";
import IPhoneNumber from "../PhoneInput/IPhoneNumber";
import PhoneInput from "../PhoneInput";
import TimeInput from "../TimeInput";
import ITimeInput from "../TimeInput/ITimeInput";
import IRestaurantInput from "../DropdownInput/IRestaurantInput";


export default class GeneralPage extends React.Component<{}, IGeneralPageState> {
    constructor(props : {}) {
        super(props);
        this.state = {
            isComplete: false,
            phone: { number: "", valid: false },
            email: { email: "", valid: false },
            time: { time: "", valid: false },
            restaurant: { value : {
                name: "",
            }, valid: false},
            focusedDropdown: false
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRestaurant = this.handleRestaurant.bind(this);
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                <Logo />
                <Form>
                    <GeneralTitle />
                    <RestaurantDropdown
                        onChange={this.handleRestaurant} 
                        focused={this.state.focusedDropdown}/>
                    <TimeInput onChange={this.handleTime} />
                    <Instructions>Please enter one of the following:</Instructions>
                    <EmailInput onChange={this.handleEmail} />
                    <p className="or">Or</p>
                    <PhoneInput onChange={this.handlePhone} />
                    <Submit onClick={this.handleSubmit} visible={this.state.isComplete}/>
                </Form>
            </div>
        )
    }

    private handleClick(event : MouseEvent) {
        this.setState({
            focusedDropdown: this.containedInDropdown(event.target as HTMLElement)
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

    private handleRestaurant(restaurant : IRestaurantInput) {
        this.setState({
            restaurant,
            isComplete: (this.state.email.valid || this.state.phone.valid) &&
                        (this.state.time.valid && restaurant.valid)
        })
    }

    private handleTime(time : ITimeInput) {
        this.setState({
            time,
            isComplete: (this.state.email.valid || this.state.phone.valid) &&
                        (this.state.time.valid && this.state.restaurant.valid)
        })
    }

    private handleEmail(email : IEmail) {
        this.setState({
            email,
            isComplete: (email.valid || this.state.phone.valid) &&
                        (this.state.time.valid && this.state.restaurant.valid)
        })
    }

    private handlePhone(phone : IPhoneNumber) {
        this.setState({
            phone,
            isComplete: (this.state.email.valid || phone.valid) &&
                        (this.state.time.valid && this.state.restaurant.valid)
        })
    }

    private handleSubmit(event : MouseEvent) {

    }
}