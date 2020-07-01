import React from "react";
import ILearnMoreLayoutProps from "./ILearnMoreLayoutProps";
import LearnMoreNavbar from "./LearnMoreNavbar";
import "./index.css"
import NavPanel from "../Components/NavPanel";
import LearnMorePage from "../../Pages/LearnMorePage";
import LearnMoreContainer from "./LearnMoreContainer";
import Cookie from "../../lib/Cookie";

export default class LearnMoreLayout extends React.Component<ILearnMoreLayoutProps> {
    render() {
        return (
            <div style={{display: "flex"}}>
                {
                    Cookie.getCookie("token") !== null ? 
                        <NavPanel /> :
                        null
                }
                <LearnMoreNavbar />
                <LearnMoreContainer title={this.paramToDisplayString(this.props.match.params.product)}>
                    <LearnMorePage product={this.props.match.params.product} />
                </LearnMoreContainer>
            </div>
        )
    }

    private paramToDisplayString(product : string) {
        let words = product.split("-");
        words = words.map((word : string) => {
            return word.substring(0, 1).toUpperCase() + word.substring(1, word.length);
        });
        return words.join(" ");
    }
}