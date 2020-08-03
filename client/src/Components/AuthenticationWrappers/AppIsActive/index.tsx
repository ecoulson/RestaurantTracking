import React from "react";
import Axios from "axios";
import IAppIsActiveProps from "./IAppIsActiveProps";
import AppHistory from "../../../AppHistory";

export default class AppIsActive extends React.Component<IAppIsActiveProps> {
    async componentDidMount() {
        const res = await Axios.get(`/api/app/isActive/${this.props.organizationId}/${this.props.appType}`)
        if (!res.data.data) {
            AppHistory.push(`/check-in/${this.props.organizationId}/inactive`)
        }
    }

    render() {
        return this.props.children
    }
}