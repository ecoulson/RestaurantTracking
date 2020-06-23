import React from "react";
import "./index.css";
import SlideSwitch from "../../../Components/SlideSwitch";
import LearnMoreNavlink from "./LearnMoreNavlink";
import ILearnMoreNavbarState from "./ILearnMoreNavbarState";
import { debounce } from "../../../lib/Debounce";
import LearnMoreSections from "./LearnMoreSections";

export default class LearnMoreNavbar extends React.Component<any, ILearnMoreNavbarState> {
    private clicked : boolean;
    private unSetClicked : () => void;

    constructor(props: any) {
        super(props);
        this.state = {
            selected: 1
        }
        this.clicked = false;
        this.onClick = this.onClick.bind(this);
        this.unSetClicked = debounce(() => {
            this.clicked = false;
        }, 1000)
    }

    componentDidMount() {
        this.handleScroll();
    }

    render() {
        return (
            <div className="learn-more-navbar-container">
                <div onClick={this.onClick} className="learn-more-navbar">
                    <SlideSwitch selected={this.state.selected} optionWidth={150} onChange={() => {}}>
                        <LearnMoreNavlink>Top</LearnMoreNavlink>
                        <LearnMoreNavlink>Overview</LearnMoreNavlink>
                        <LearnMoreNavlink>Features</LearnMoreNavlink>
                        <LearnMoreNavlink>Pricing</LearnMoreNavlink>
                    </SlideSwitch>
                </div>
            </div>
        )
    }

    private onClick() {
        this.clicked = true;
        this.unSetClicked();
    }

    // TODO: Refactor
    private handleScroll() {
        const container = document.getElementsByClassName("learn-more-container")[0];
        if (container) {
            const widgets = container.getElementsByClassName("learn-more-section");
            container.addEventListener("scroll", (event : any) => {
                if (event.target.scrollTop > 200) {
                    document.getElementsByClassName("learn-more-navbar-container")[0].classList.add("learn-more-navbar-container-top")
                } else {
                    document.getElementsByClassName("learn-more-navbar-container")[0].classList.remove("learn-more-navbar-container-top")
                }
                if (!this.clicked) {
                    let index = 0;
                    Array.from(widgets).forEach((widget, i) => {
                        if ((widget as HTMLElement).offsetTop < event.target.scrollTop + window.innerHeight / 8) {
                            index = i;
                        }
                    })
                    if (event.target.scrollTop <= 50) {
                        this.setState({
                            selected: LearnMoreSections.Top
                        })
                    } else if (index + 1 !== this.state.selected) {
                        this.setState({
                            selected: index + 1
                        })
                    }
                }
            })
        }
    }
}