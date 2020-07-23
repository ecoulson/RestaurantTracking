import React from "react";
import BasicSectionTitle from "../../../Layouts/BasicLayout/BasicSectionTitle";
import "./index.css";
import BuildingList from "./BuildingList";
import AddBuildingForm from "./AddBuildingForm";

export default class BuildingSection extends React.Component {
    render() {
        return (
            <div>
                <BasicSectionTitle>Buildings</BasicSectionTitle>
                <div className="building-container">
                    <AddBuildingForm />
                    <BuildingList />
                </div>
            </div>
        )
    }
}