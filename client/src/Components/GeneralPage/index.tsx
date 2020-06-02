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


export default class GeneralPage extends React.Component<{}, IGeneralPageState> {
    constructor(props : {}) {
        super(props);
        this.state = {
            isComplete: false,
            phone: { number: "", valid: false },
            email: { email: "", valid: false },
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleTime = this.handleTime.bind(this);
    }

    render() {
        return (
            <>
                <Logo />
                <Form>
                    <GeneralTitle />
                    <RestaurantDropdown />
                    <TimeInput onChange={this.handleTime} />
                    <Instructions>Please enter one of the following:</Instructions>
                    <EmailInput onChange={this.handleEmail} />
                    <p className="or">Or</p>
                    <PhoneInput onChange={this.handlePhone} />
                    <Submit onClick={this.handleSubmit} visible={this.state.isComplete}/>
                </Form>
            </>
        )
    }

    private handleTime(time : ITimeInput) {
        console.log(time);
    }

    private handleEmail(email : IEmail) {
        this.setState({
            email,
            isComplete: email.valid || this.state.phone.valid
        })
    }

    private handlePhone(phone : IPhoneNumber) {
        this.setState({
            phone,
            isComplete: phone.valid || this.state.email.valid
        })
    }

    private handleSubmit(event : MouseEvent) {

    }
}