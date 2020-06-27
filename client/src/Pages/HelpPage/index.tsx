import React from "react";
import BasicLayout from "../../Layouts/BasicLayout";
import { Link } from "react-router-dom";
import BasicSection from "../../Layouts/BasicLayout/BasicSection";
import BasicSectionTitle from "../../Layouts/BasicLayout/BasicSectionTitle";
import "./index.css";

export default class HelpPage extends React.Component {
    render() {
        return (
            <BasicLayout title="Help">
                <BasicSection>
                    <BasicSectionTitle>Legal</BasicSectionTitle>
                    <div className="legal-list">
                        <Link className="legal-document-link" to="/legal/privacy-policy">Privacy Policy</Link>
                        <Link className="legal-document-link" to="/legal/terms-and-conditions">Terms and Conditions</Link>
                    </div>
                </BasicSection>
                <BasicSection>
                    <BasicSectionTitle>Contact Us</BasicSectionTitle>
                    <p>Email Us: <a href="mailto:support@adaptsolutions.tech">support@adaptsolutions.tech</a></p>
                </BasicSection>
            </BasicLayout>
        )
    }
}