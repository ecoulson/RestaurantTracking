import React from "react";
import GetBuildingsRequest from "../../API/GetBuildingsRequest";
import IBuildingDropdownProps from "./IBuildingDropdownProps";
import IBuildingDropdownState from "./IBuildingDropdownState";
import IGetBuildingResponse from "../../API/GetBuildingsRequest/IGetBuildingsResponse";
import IResponse from "../../API/IResponse";
import DropdownInput from "../DropdownInput";

export default class BuildingDropdown extends React.Component<IBuildingDropdownProps, IBuildingDropdownState> {
    constructor(props: IBuildingDropdownProps) {
        super(props);
        this.state = {
            buildings: [],
            value: ""
        }
        this.onBuildings = this.onBuildings.bind(this);
    }

    render() {
        return (
            <>
                <GetBuildingsRequest 
                    send
                    organizationId={this.props.organizationId}
                    onComplete={this.onBuildings} />
                <DropdownInput
                    values={this.state.buildings
                        .filter((building) => building.type === this.props.type)
                        .map((building) => building.name)
                        .sort()}
                    onChange={(value, index) => {
                        this.props.onChange(this.state.buildings[
                            this.state.buildings
                                .map(building => building.name)
                                .indexOf(value)
                            ])
                    }} />
            </>
        )
    }

    private onBuildings(response : IResponse<IGetBuildingResponse>) {
        this.setState({
            buildings: response.data.buildings,
        })
    }
}