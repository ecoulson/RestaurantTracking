import React from "react";
import IPageLayoutProps from "./IPageLayoutProps";
import PageTitle from "../../Components/PageTitle";

export default class PageLayout extends React.Component<IPageLayoutProps> {
    render() {
        return (
            <> 
                <PageTitle title={this.props.pageTitle}/>
                {this.props.children}
            </>
        )
    }
}