import React from "react";
import "./index.css";

export default class FeatureSectionContainer extends React.Component {
    render() {
        return (
            <div className="feature-section-container">
                {
                    React.Children.map(this.props.children, (child) => {
                        return <div className="feature-section-container-item">
                            {child}
                        </div>
                    })
                }
            </div>
        )
    }
}