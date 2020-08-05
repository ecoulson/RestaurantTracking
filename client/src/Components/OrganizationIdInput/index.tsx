import React from "react";
import IOrganizationIdInputState from "./IOrganizationIdInputState";
import IOrganizationInputProps from "./IOrganizationIdInputProps";
import FormInput from "../FormInput";
import IconType from "../Icon/IconTypes";
import IFormValue from "../FormInput/IFormValue";
import { debounce } from "../../lib/Debounce";
import Axios from "axios";
import Cookie from "../../lib/Cookie";
import FormValue from "../FormInput/FormValue";

export default class OrganizationIdInput extends React.Component<IOrganizationInputProps, IOrganizationIdInputState> {
    private isOrganizationIdAvailable: () => void;

    constructor(props : IOrganizationInputProps) {
        super(props);
        this.state = {
            valid: undefined
        }
        this.onChange = this.onChange.bind(this);
        this.isOrganizationIdAvailable = debounce(() => {
            this.validateOrganizationId(this.props.value);
        }, 500)
    }

    componentWillReceiveProps(props : IOrganizationInputProps) {
        if (props.value !== this.props.value) {
            this.onChange(new FormValue(props.value, false))
        }
    }

    render() {
        return <FormInput 
                    id={this.props.id}
                    name="establishment-id"
                    value={this.props.value}
                    icon={IconType.Link}
                    help="This ID will be used to brand links and identify you."
                    iconColor="#AAAAAA"
                    isValid={this.state.valid}
                    autocomplete={"off"}
                    hoverColor="#232C47"
                    placeHolder="Enter an establishment ID..."
                    label="Establishment ID"
                    type="text"
                    onChange={this.onChange} />;
    }

    onChange(organizationId : IFormValue<string>) {
        this.isOrganizationIdAvailable();
        this.props.onChange(organizationId)
    }

    async validateOrganizationId(value : string) {
        if (this.props.value !== "") {
            const res = await Axios.get(`/api/organization/register/exists/${value}`, {
                headers: {
                    "Authorization": `Bearer: ${Cookie.getCookie("token")}`
                }
            })
            this.setState({
                valid: !res.data.data.exists
            }, () => {
                this.props.onChange(new FormValue(this.props.value, this.state.valid as boolean))
            })
        }
    }
}