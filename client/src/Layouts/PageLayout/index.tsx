import React from "react";
import IPageLayoutProps from "./IPageLayoutProps";
import PageTitle from "../../Components/PageTitle";
import { ReactComponent as SVGDefs } from "../../Components/Icon/svgs/defs.svg";

export default class PageLayout extends React.Component<IPageLayoutProps> {
    render() {
        return (
            <> 
                <PageTitle title={this.props.pageTitle}/>
                <div style={{width: 0, height: 0}}>
                    <SVGDefs />
                </div>
                {this.props.children}
            </>
        )
    }
}