import React from "react";
import IValidationProps from "./IValidationProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default class ValidationIcon extends React.Component<IValidationProps> {
    render() {
        return this.renderValidationIcon()
    }

    private renderValidationIcon() {
        if (this.props.value === "") {
            return null;
        }
        return this.props.isValid ?
            (<FontAwesomeIcon className="valid-field" icon="check" />) :
            (<FontAwesomeIcon className="invalid-field" icon="times" />);
    }
}