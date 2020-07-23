import React from "react";
import BasicSectionTitle from "../../../Layouts/BasicLayout/BasicSectionTitle";
import "./index.css";
import BuildingList from "./BuildingList";
import AddBuildingForm from "./AddBuildingForm";
import IBuildingSectionProps from "./IBuildingSectionProps";

export default class BuildingSection extends React.Component<IBuildingSectionProps> {
    render() {
        return (
            <div>
                <BasicSectionTitle>Buildings</BasicSectionTitle>
                <AddBuildingForm organizationId={this.props.organizationId} />
                <BuildingList organizationId={this.props.organizationId} />
            </div>
        )
    }
}