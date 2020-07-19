import React from "react";
import DropdownInput from "../DropdownInput";
import GetBuildingsRequest from "../../API/GetBuildingsRequest";
import IBuildingDropdownProps from "./IBuildingDropdownProps";
import IBuildingDropdownState from "./IBuildingDropdownState";
import IFormValue from "../FormInput/IFormValue";
import IconType from "../Icon/IconTypes";
import IGetBuildingResponse from "../../API/GetBuildingsRequest/IGetBuildingsResponse";
import IResponse from "../../API/IResponse";

export default class BuildingDropdown extends React.Component<IBuildingDropdownProps, IBuildingDropdownState> {
    constructor(props: IBuildingDropdownProps) {
        super(props);
        this.state = {
            buildings: [],
            value: ""
        }
        this.handleChange = this.handleChange.bind(this);
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
                    label={`${this.props.type} Buildings`}
                    placeholder="Enter building name"
                    icon={IconType.BuildingSolid}
                    dark={this.props.dark}
                    iconColor={this.props.iconColor}
                    hoverColor={this.props.hoverColor}
                    values={this.getBuildingNames()}
                    onChange={this.handleChange} />
            </>
        )
    }

    private onBuildings(response : IResponse<IGetBuildingResponse>) {
        this.setState({
            buildings: response.data.buildings,
        })
    }

    private getBuildingNames() {
        return this.state.buildings
            // .filter((building) => {
            //     return building.type === this.props.type
            // })
            // .filter((building) => {
            //     return building.name.includes(this.state.value)
            // })
            .map((building) => {
                return building.name
            })
            // .sort()
    }

    private handleChange(dropdownValue : IFormValue<number>, value?: string) {
        this.setState({ value : value ? value : "" })
        this.props.onChange(this.state.buildings[dropdownValue.value]);
    }
}