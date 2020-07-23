import React from "react";
import LearnMoreSubtitle from "../../../LearnMorePage/LearnMoreSubtitle";
import "./index.css";
import GetBuildingsRequest from "../../../../API/GetBuildingsRequest";
import IBuildingListProps from "./IBuildingListProps";
import IGetBuildingResponse from "../../../../API/GetBuildingsRequest/IGetBuildingsResponse";
import IResponse from "../../../../API/IResponse";
import IBuildingListState from "./IBuildingListState";

export default class BuildingList extends React.Component<IBuildingListProps, IBuildingListState> {
    constructor(props : IBuildingListProps) {
        super(props);
        this.state = { 
            buildings: [],
            send: true
        }
        this.onBuildings = this.onBuildings.bind(this);
        this.onError = this.onError.bind(this);
    }

    render() {
        return (
            <div className="building-list-container">
                <GetBuildingsRequest
                    send={this.state.send}
                    onComplete={this.onBuildings}
                    onError={this.onError}
                    organizationId={this.props.organizationId} />
                <LearnMoreSubtitle>Building List</LearnMoreSubtitle>
                {this.renderBuildings()}
            </div>
        )
    }

    renderBuildings() {
        return this.state.buildings.map((building, i) => {
            return <h4 key={i}>{building.name} | {building.type}</h4>
        })
    }

    onBuildings(response : IResponse<IGetBuildingResponse>) {
        this.setState({
            buildings: response.data.buildings,
            send: false
        })
    }

    onError() {
        this.setState({
            send: false
        })
    }
}