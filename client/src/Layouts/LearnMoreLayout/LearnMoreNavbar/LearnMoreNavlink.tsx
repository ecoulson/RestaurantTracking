import React, { MouseEvent } from "react";

export default class LearnMoreNavlink extends React.Component {
    render() {
        return (
            <div onClick={this.onClick}>{this.props.children}</div>
        )
    }

    private onClick(event : MouseEvent) {
        const element = event.target as HTMLElement;
        if (element.textContent) {
            const container = document.getElementsByClassName("learn-more-container")[0];
            const targetId = `learn-more-section-${element.textContent.toLowerCase().split(" ").join("-")}`;
            console.log(targetId);
            const targetElement = document.getElementById(targetId);
            if (targetId === "learn-more-section-top") {
                container.scrollTo({
                    behavior: "smooth",
                    top: 0,
                    left: 0,
                })
            } else if (targetElement && container) {
                container.scrollTo({
                    behavior: "smooth",
                    top: targetElement.offsetTop - 25,
                    left: 0,
                })
            }
        }
    }
}