import React from "react";
import "./index.css";
import CheckboxInput from "../../../../Components/CheckboxInput";
import ForgotPasswordLink from "../ForgotPasswordLink";
import ILoginSettingsContainerProps from "./ILoginSettingsContainerProps";

export default class LoginSettingsContainer extends React.Component<ILoginSettingsContainerProps> {
    render() {
        return (
            <div className="login-settings-container">
                <CheckboxInput 
                    onChange={this.props.onRememberMeChange}
                    label="Remember me"/>
                <ForgotPasswordLink />
            </div>
        )
    }
}