import React from "react";
import "./index.css";

export default class OverviewAboutContainer extends React.Component {
    render() {
        return (
            <div className="overview-about-container">
                {
                    React.Children.map(this.props.children, (child) => {
                        return (
                            <div className="overview-about-container-item">
                                {child}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}