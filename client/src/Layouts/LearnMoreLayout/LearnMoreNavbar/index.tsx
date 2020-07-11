import React from "react";
import "./index.css";
import SlideSwitch from "../../../Components/SlideSwitch";
import LearnMoreNavLink from "./LearnMoreNavlink";
import ILearnMoreNavbarState from "./ILearnMoreNavbarState";
import { debounce } from "../../../lib/Debounce";
import LearnMoreSections from "./LearnMoreSections";
import Cookie from "../../../lib/Cookie";

const TopRange = 50;
const FixedNavbarRange = 200;
const SectionPortion = 8;
const DebounceTimeout = 1000;
const OptionWidth = 150;

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
        }, DebounceTimeout)
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.handleScroll();
    }

    render() {
        return (
            <div className={`learn-more-navbar-container ${this.getInitialPosition()}`}>
                <div onClick={this.onClick} className="learn-more-navbar">
                    <SlideSwitch 
                        selected={this.state.selected} 
                        optionWidth={OptionWidth} 
                        onChange={this.onChange}>
                        <LearnMoreNavLink>Top</LearnMoreNavLink>
                        <LearnMoreNavLink>Overview</LearnMoreNavLink>
                        <LearnMoreNavLink>Features</LearnMoreNavLink>
                        <LearnMoreNavLink>Pricing</LearnMoreNavLink>
                    </SlideSwitch>
                </div>
            </div>
        )
    }

    private getInitialPosition() {
        return Cookie.getCookie("token") ?
            "learn-more-navbar-container" :
            "learn-more-navbar-container-unauthenticated"
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
                top: section.offsetTop - TopRange,
                left: 0,
            })
        }
    }

    private onClick() {
        this.clicked = true;
        this.unSetClicked();
    }

    private handleScroll() {
        const container = document.getElementsByClassName("learn-more-container")[0];
        if (container) {
            const sections = container.getElementsByClassName("learn-more-section");
            container.addEventListener("scroll", this.scrollHandler(sections))
        }
    }

    private scrollHandler(sections: HTMLCollectionOf<Element>) {
        return (event: Event) => {
            const target = event.target as HTMLElement
            this.positionNavbar(target)
            if (!this.clicked) {
                const index = this.getSelectedIndex(sections, target)
                this.updateSelectedIndex(target, index);
            }
        }
    }

    private positionNavbar(target : HTMLElement) {
        if (this.isNavbarFixed(target)) {
            document
                .getElementsByClassName("learn-more-navbar-container")[0]
                .classList.add("learn-more-navbar-container-top")
        } else {
            document
                .getElementsByClassName("learn-more-navbar-container")[0]
                .classList.remove("learn-more-navbar-container-top")
        }
    }

    private isNavbarFixed(target : HTMLElement) {
        return target.scrollTop > FixedNavbarRange;
    }

    private getSelectedIndex(sections : HTMLCollectionOf<Element>, target : HTMLElement) {
        let index = 0;
        Array.from(sections).forEach((section, i) => {
            const element = section as HTMLElement;
            if (element.offsetTop < target.scrollTop + window.innerHeight / SectionPortion) {
                index = i;
            }
        })
        return index;
    }

    private updateSelectedIndex(target : HTMLElement, index : number) {
        if (this.isAtTop(target)) {
            this.setState({
                selected: LearnMoreSections.Top
            })
        } else if (this.hasPassedIndex(index)) {
            this.setState({
                selected: index + 1
            })
        }
    }

    private isAtTop(target : HTMLElement) {
        return target.scrollTop <= TopRange;
    }

    private hasPassedIndex(index : number) {
        return index + 1 !== this.state.selected;
    }
}