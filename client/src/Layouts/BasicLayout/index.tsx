import React from "react";
import IUserProfileLayoutProps from "./IBasicLayoutProps";
import BasicLayoutContainer from "./BasicLayoutContainer";
import PageLayout from "../PageLayout";

export default class BasicLayout extends React.Component<IUserProfileLayoutProps> {
    render() {
        return (
            <PageLayout pageTitle={this.props.title}>
                <BasicLayoutContainer {...this.props}>
                    {this.props.children}
                </BasicLayoutContainer>
            </PageLayout>
        )
    }
}