import React from "react";
import "./index.css";
import SlideSwitch from "../../../Components/SlideSwitch";
import LearnMoreNavLink from "./LearnMoreNavlink";
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
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.handleScroll();
    }

    render() {
        return (
            <div className="learn-more-navbar-container">
                <div onClick={this.onClick} className="learn-more-navbar">
                    <SlideSwitch selected={this.state.selected} optionWidth={150} onChange={this.onChange}>
                        <LearnMoreNavLink>Top</LearnMoreNavLink>
                        <LearnMoreNavLink>Overview</LearnMoreNavLink>
                        <LearnMoreNavLink>Features</LearnMoreNavLink>
                        <LearnMoreNavLink>Pricing</LearnMoreNavLink>
                    </SlideSwitch>
                </div>
            </div>
        )
    }

    private onChange(index : number) {
        this.clicked = true;
        this.unSetClicked();
        const container = document.getElementsByClassName("learn-more-container")[0];
        const sections = container.getElementsByClassName("learn-more-section");
        const section = sections[index] as HTMLElement;
        if (section.id === "learn-more-section-top") {
            container.scrollTo({
                behavior: "smooth",
                top: 0,
                left: 0,
            })
        } else {
            container.scrollTo({
                behavior: "smooth",
                top: section.offsetTop - 25,
                left: 0,
            })
        }
    }

    private onClick() {
        this.clicked = true;
        this.unSetClicked();
    }

    // TODO: Refactor
    private handleScroll() {
        const container = document.getElementsByClassName("learn-more-container")[0];
        if (container) {
            const sections = container.getElementsByClassName("learn-more-section");
            container.addEventListener("scroll", (event : any) => {
                if (event.target.scrollTop > 200) {
                    document.getElementsByClassName("learn-more-navbar-container")[0].classList.add("learn-more-navbar-container-top")
                } else {
                    document.getElementsByClassName("learn-more-navbar-container")[0].classList.remove("learn-more-navbar-container-top")
                }
                if (!this.clicked) {
                    let index = 0;
                    Array.from(sections).forEach((section, i) => {
                        if ((section as HTMLElement).offsetTop < event.target.scrollTop + window.innerHeight / 8) {
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