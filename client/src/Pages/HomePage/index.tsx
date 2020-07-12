import React from "react";
import PageLayout from "../../Layouts/PageLayout";
import Hero from "./Hero";
import ContactSection from "./ContactSection";
import ContactLogsSection from "./ContactLogsSection";
import TriangleTop from "./TriangleTop";
import TriangleBottom from "./TriangleBottom";

export default class HomePage extends React.Component {
    render() {
        return (
            <PageLayout pageTitle="Adapt Solutions">
                <Hero />
                <div style={{position: "relative"}}>
                    <ContactSection />
                    <ContactLogsSection />
                    <TriangleTop />
                    <TriangleBottom />
                </div>
            </PageLayout>
        )
    }
}