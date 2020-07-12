import React from "react";
import PageLayout from "../../Layouts/PageLayout";
import Hero from "./Hero";

export default class HomePage extends React.Component {
    render() {
        return (
            <PageLayout pageTitle="Adapt Solutions">
                <Hero />
            </PageLayout>
        )
    }
}