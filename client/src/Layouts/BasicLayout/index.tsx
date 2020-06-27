import React from "react";
import IUserProfileLayoutProps from "./IBasicLayoutProps";
import BasicLayoutContainer from "./BasicLayoutContainer";

export default class BasicLayout extends React.Component<IUserProfileLayoutProps> {
    render() {
        return (
            <BasicLayoutContainer {...this.props}>
                {this.props.children}
            </BasicLayoutContainer>
        )
    }
}