import React from "react";
import IBasicLayoutProps from "../IBasicLayoutProps";
import DashboardTitle from "../../DashboardLayout/DashboardTitle";
import "./index.css";
import DashboardNavPanel from "../../DashboardLayout/DashboardNavPanel";
import Cookie from "../../../lib/Cookie";

export default class BasicLayoutContainer extends React.Component<IBasicLayoutProps> {
    render() {
        return (
            <div style={{display: "flex"}}>
                {
                    Cookie.getCookie("token") !== null ?
                        <DashboardNavPanel /> :
                        null
                }
                <div className="basic-layout-page"> 
                    <DashboardTitle>{this.props.title}</DashboardTitle>
                    <div className="basic-layout-wrapper">
                        <div className="basic-layout-container">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}