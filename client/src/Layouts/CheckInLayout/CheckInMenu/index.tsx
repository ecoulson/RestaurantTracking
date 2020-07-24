import React from "react";
import CheckInMenuContainer from "./CheckInMenuContainer";
import CheckInMenuClose from "./CheckInMenuClose";
import { Link } from "react-router-dom";
import ICheckInMenuProps from "./ICheckInMenuProps";

export default class CheckInMenu extends React.Component<ICheckInMenuProps> {
    render() {
        return (
            <CheckInMenuContainer>
                <CheckInMenuClose />
                <Link to={`/check-in/${this.props.organizationId}/logout`}>Logout</Link>
            </CheckInMenuContainer>
        )
    }
}