import React from "react";
import IBasicLayoutProps from "../IBasicLayoutProps";
import DashboardTitle from "../../DashboardLayout/DashboardTitle";
import "./index.css";
import NavPanel from "../../Components/NavPanel";
import Cookie from "../../../lib/Cookie";
import LegalFooter from "../../Components/LegalFooter";

export default class BasicLayoutContainer extends React.Component<IBasicLayoutProps> {
    render() {
        return (
            <div style={{display: "flex"}}>
                {this.getNavPanel()}
                <div className="basic-layout-page"> 
                    <div className="basic-layout-wrapper">
                        <DashboardTitle>{this.props.title}</DashboardTitle>
                        <div className="basic-layout-container">
                            {this.props.children}
                        </div>
                        <LegalFooter />
                    </div>
                </div>
            </div>
        )
    }

    private getNavPanel() {
        return Cookie.getCookie("token") !== null ?
            <NavPanel /> :
            null
    }
}