import React from "react";
import "./StatusPage.css";
import Title from "./Title";
import StatusIcon from "./StatusIcon";
import IStatusPageProps from "./IStatusPageProps";
import Status from "./Status";

export default class StatusPage extends React.Component<IStatusPageProps> {
    render() {
        return (
            <div style={this.getColor()} className="status-page">
                <div className="status-container">
                    <Title>{this.getStatusPageTitle()}</Title>
                    <StatusIcon status={this.props.status}/>
                    {this.getStatusMessage()}
                </div>
            </div>
        )
    }

    private getColor() {
        switch(this.props.status) {
            case Status.SUCCESS:
                return { backgroundColor: "#45DFC2" };
            case Status.FAILURE:
                return { backgroundColor: "#E35A42" };
        }
    }

    private getStatusPageTitle() {
        switch(this.props.status) {
            case Status.SUCCESS:
                return "Success!"
            case Status.FAILURE:
                return "Uh Oh!"
        }
    }

    private getStatusMessage() {
        switch(this.props.status) {
            case Status.SUCCESS:
                return (
                    <p className="status-message">
                        You have succesfully checked in to <b>{this.props.restaurant}</b>
                    </p>
                )
            case Status.FAILURE:
                return (
                    <p className="status-message">
                        You have failed to check in to <b>{this.props.restaurant}</b>
                    </p>
                )
        }
    }
}