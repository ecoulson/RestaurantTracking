import React from "react";
import DropdownInput from "../DropdownInput";
import GetBuildingsRequest from "../../API/GetBuildingsRequest";
import IBuildingDropdownProps from "./IBuildingDropdownProps";
import IBuildingDropdownState from "./IBuildingDropdownState";
import IFormValue from "../FormInput/IFormValue";
import IconType from "../Icon/IconTypes";
import IGetBuildingResponse from "../../API/GetBuildingsRequest/IGetBuildingsResponse";
import IResponse from "../../API/IResponse";
import e from "express";

export default class BuildingDropdown extends React.Component<IBuildingDropdownProps, IBuildingDropdownState> {
    constructor(props: IBuildingDropdownProps) {
        super(props);
        this.state = {
            buildings: [],
            filteredBuildings: [],
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
            filteredBuildings: response.data.buildings
                .filter((building) => {
                    return building.type === this.props.type
                })
                .filter((building) => {
                    return building.name.includes(this.state.value.toLowerCase())
                })
                .sort((buildingA, buildingB) => {
                    if (buildingA.name > buildingB.name) {
                        return 1
                    } else if (buildingB.name === buildingA.name) {
                        return 0;
                    } else {
                        return -1;
                    }
                })
        })
    }

    private getBuildingNames() {
        return this.state.buildings
        .filter((building) => {
            return building.type === this.props.type
        }).filter((building) => {
            return building.name.includes(this.state.value.toLowerCase())
        }).map((building) => {
            return building.name.split(" ").map((word) => {
                return `${word.substring(0, 1).toUpperCase()}${word.substring(1, word.length).toLowerCase()}`
            }).join(" ")
        }).sort()
    }

    private handleChange(dropdownValue : IFormValue<number>, value?: string) {
        this.setState({ 
            value : value ? value : this.state.value,
            filteredBuildings: this.state.buildings
                .filter((building) => {
                    return building.type === this.props.type
                })
                .filter((building) => {
                    return building.name.includes(this.state.value.toLowerCase())
                })
                .sort((buildingA, buildingB) => {
                    if (buildingA.name > buildingB.name) {
                        return 1
                    } else if (buildingB.name === buildingA.name) {
                        return 0;
                    } else {
                        return -1;
                    }
                })
        }, () => {
            this.props.onChange(this.state.filteredBuildings[dropdownValue.value]);
        })
    }
}