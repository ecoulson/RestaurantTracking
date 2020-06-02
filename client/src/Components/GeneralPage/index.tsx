import React, { MouseEvent } from "react";
import Logo from "../Logo";
import Instructions from "../Instructions";
import Form from "../Form";
import Submit from "../Submit";
import GeneralTitle from "../GeneralTitle";
import RestaurantDropdown from "../DropdownInput";
import IGeneralPageState from "./IGeneralPageState";
import EmailInput from "../EmailInput";
import PhoneInput from "../PhoneInput";
import TimeInput from "../TimeInput";
import IRestaurantInput from "../DropdownInput/IRestaurantInput";
import Axios from "axios";
import ICheckInBody from "../../lib/ICheckInBody";
import moment from "moment";
import Restaurant from "../../lib/Restaurant";
import IPageProps from "../../IPageProps";
import ApplicationState from "../../Page";
import IFormValue from "../FormInput/IFormValue";
import FormValue from "../FormInput/FormValue";
import IRestaurant from "../../lib/IRestaurant";


export default class GeneralPage extends React.Component<IPageProps, IGeneralPageState> {
    constructor(props : IPageProps) {
        super(props);
        this.state = {
            isComplete: false,
            phone: new FormValue<string>("", false),
            email: new FormValue<string>("", false),
            time: new FormValue<string>("", false),
            restaurant: new FormValue<IRestaurant>(new Restaurant(), false),
            focusedDropdown: false,
            isSubmitting: false
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.handleRestaurant = this.handleRestaurant.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <>
                <Logo />
                <Form isSubmitting={this.state.isSubmitting}>
                    <GeneralTitle />
                    <RestaurantDropdown onChange={this.handleRestaurant} />
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

    private handleRestaurant(restaurant : IRestaurantInput) {
        if (restaurant.valid) {
            this.props.setRestaurantName!(restaurant.value.name)
        } 
        this.setState({
            restaurant
        }, () => {
            this.setState({
                isComplete: this.isComplete()
            })
        })
    }

    private isComplete() {
        if (this.state.email.valid && this.state.phone.value === "") {
            return this.state.time.valid && this.state.restaurant.valid;
        }
        if (this.state.phone.valid && this.state.email.value === "") {
            return this.state.time.valid && this.state.restaurant.valid;
        }
        return this.state.email.valid && this.state.phone.valid &&
                this.state.time.valid && this.state.restaurant.valid;
    }

    private handleTime(time : IFormValue<string>) {
        this.setState({
            time,
        }, () => {
            this.setState({
                isComplete: this.isComplete()
            })
        })
    }

    private handleEmail(email : IFormValue<string>) {
        this.setState({
            email,
        }, () => {
            this.setState({
                isComplete: this.isComplete()
            })
        })
    }

    private handlePhone(phone : IFormValue<string>) {
        this.setState({
            phone,
        }, () => {
            this.setState({
                isComplete: this.isComplete()
            })
        })
    }

    private async handleSubmit(event : MouseEvent) {
        if (this.state.isComplete) {
            this.setState({
                isSubmitting: true
            })
            const checkIn : ICheckInBody = {
                restaurantId: this.state.restaurant.value._id,
                timeCheckedIn: moment(this.state.time.value, "M/D/Y h:mm A").toDate(),
            }
            if (this.state.email.valid) {
                checkIn.email = this.state.email.value;
            }
            if (this.state.phone.valid) {
                checkIn.number = this.state.phone.value;
            }
            try {
                const res = await Axios.post("/check_in/", checkIn);
                if (res.data.success) {
                    this.props.setPage!(ApplicationState.Success)
                } else {
                    this.props.setPage!(ApplicationState.Failure)
                }
            } catch (error) {
                this.props.setPage!(ApplicationState.Failure)
            }
        }
    }
}