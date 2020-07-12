import React from "react";
import IPageTitleProps from "./IPageTitleProps";

export default class PageTitle extends React.Component<IPageTitleProps> {
    componentDidMount() {
        document.title = this.props.title;
    }

    componentDidUpdate() {
        document.title = this.props.title;
    }

    render() {
        return null;
    }
}