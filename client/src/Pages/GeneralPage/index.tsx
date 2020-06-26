import React, { MouseEvent } from "react";
import Logo from "../../Components/Logo";
import Instructions from "../../Components/Instructions";
import Form from "../../Components/Form";
import Submit from "../../Components/Submit";
import GeneralTitle from "../../Components/GeneralTitle";
import RestaurantDropdown from "../../Components/DropdownInput";
import IGeneralPageState from "./IGeneralPageState";
import EmailInput from "../../Components/EmailInput";
import PhoneInput from "../../Components/PhoneInput";
import TimeInput from "../../Components/TimeInput";
import IRestaurantInput from "../../Components/DropdownInput/IRestaurantInput";
import Axios from "axios";
import ICheckInBody from "../../lib/ICheckInBody";
import moment from "moment";
import Restaurant from "../../lib/Restaurant";
import IPageProps from "../../IPageProps";
import ApplicationState from "../../Page";
import IFormValue from "../../Components/FormInput/IFormValue";
import FormValue from "../../Components/FormInput/FormValue";
import IRestaurant from "../../lib/IRestaurant";
import DateInput from "../../Components/DateInput";
import SlideSwitch from "../../Components/SlideSwitch";
import LegalContainer from "../../Components/LegalContainer";
import Icon from "../../Components/Icon";
import IconType from "../../Components/Icon/IconTypes";
import CheckInType from "../../lib/CheckInInputType";

export default class GeneralPage extends React.Component<IPageProps, IGeneralPageState> {
    constructor(props : IPageProps) {
        super(props);
        this.state = {
            isComplete: false,
            phone: new FormValue<string>("", false),
            email: new FormValue<string>("", false),
            time: new FormValue<string>("", false),
            date: new FormValue<string>("", false),
            restaurant: new FormValue<IRestaurant>(new Restaurant(), false),
            focusedDropdown: false,
            isSubmitting: false,
            selected: CheckInType.Phone
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleRestaurant = this.handleRestaurant.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSlideSwitchChange = this.handleSlideSwitchChange.bind(this);
    }

    render() {
        return (
            <>
                <Logo dark />
                <Form isSubmitting={this.state.isSubmitting}>
                    <GeneralTitle />
                    <SlideSwitch onChange={this.handleSlideSwitchChange}>
                        <Icon color="white" icon={IconType.Phone}/>
                        <Icon color="white" icon={IconType.Mail}/>
                    </SlideSwitch>
                    {
                        this.state.selected === CheckInType.Phone ?
                            <PhoneInput iconColor="white" dark onChange={this.handlePhone} /> :
                            <EmailInput iconColor="white" dark onChange={this.handleEmail} />
                    }
                    <RestaurantDropdown iconColor="white" dark onChange={this.handleRestaurant} />
                    <DateInput iconColor="white" dark onChange={this.handleDate} />
                    <TimeInput iconColor="white" dark onChange={this.handleTime} />
                    <Instructions>Please enter one of the following:</Instructions>
                    <Submit 
                        dark 
                        onClick={this.handleSubmit} 
                        visible={this.state.isComplete}>
                            Submit
                    </Submit>
                </Form>
                <LegalContainer />
            </>
        )
    }

    private handleSlideSwitchChange(id : number) {
        this.setState({
            selected: id
        })
    }

    private handleRestaurant(restaurant : IRestaurantInput) {
        if (restaurant.valid) {
            document.title = "Check In: " + restaurant.value.name;
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
            return this.state.time.valid && this.state.restaurant.valid &&
                    this.state.date.valid;
        }
        if (this.state.phone.valid && this.state.email.value === "") {
            return this.state.time.valid && this.state.restaurant.valid &&
                    this.state.date.valid;
        }
        return this.state.email.valid && this.state.phone.valid &&
                this.state.time.valid && this.state.restaurant.valid &&
                this.state.date.valid;
    }

    private handleDate(date : IFormValue<string>) {
        this.setState({
            date,
        }, () => {
            this.setState({
                isComplete: this.isComplete()
            })
        })
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
                timeCheckedIn: moment(
                    this.state.date.value.trim() + " " + this.state.time.value.trim(), 
                    "YYYY-MM-DD h:mm A"
                ).toDate(),
            }
            if (this.state.email.valid) {
                checkIn.email = this.state.email.value;
            }
            if (this.state.phone.valid) {
                checkIn.number = this.state.phone.value;
            }
            try {
                const res = await Axios.post("/api/check_in/", checkIn);
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