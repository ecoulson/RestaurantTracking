import React from "react";
import Form from "../../../../Components/Form";
import LearnMoreSubtitle from "../../../LearnMorePage/LearnMoreSubtitle";
import TextInput from "../../../../Components/TextInput";
import IconType from "../../../../Components/Icon/IconTypes";
import CheckboxInput from "../../../../Components/CheckboxInput";
import Button from "../../../../Components/Button";
import IAddBuildingFormState from "./IAddBuildingFormState";
import BuildingType from "../../../../Components/BuildingDropdown/BuildingType";
import CreateBuildingRequest from "../../../../API/CreateBuildingRequest";
import IAddBuildingFormProps from "./IAddBuildingFormProps";

export default class AddBuildingForm extends React.Component<IAddBuildingFormProps, IAddBuildingFormState> {
    constructor(props : IAddBuildingFormProps) {
        super(props);
        this.state = {
            buildingName: "",
            buildingType: BuildingType.Academic,
            send: false
        }

        this.onBuildingNameChange = this.onBuildingNameChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <CreateBuildingRequest 
                    send={this.state.send}
                    buildingName={this.state.buildingName}
                    buildingType={this.state.buildingType}
                    organizationId={this.props.organizationId}
                    onComplete={this.onFinish}
                    onError={this.onFinish}
                    />
                <LearnMoreSubtitle>Add Building</LearnMoreSubtitle>
                <TextInput 
                    label="Building Name"
                    placeholder="Building name..."
                    name="building-name"
                    isValid={true}
                    icon={IconType.BuildingSolid}
                    iconColor="#b1b1b3"
                    hoverColor="black"
                    id="building-name"
                    onChange={this.onBuildingNameChange} />
                <div style={{width: "400px"}}>
                    <CheckboxInput label="Residential Building" onChange={this.onTypeChange}/>
                </div>
                <Button submit>Add Building</Button>
            </Form>
        )
    }

    onBuildingNameChange(buildingName: string) {
        this.setState({ buildingName })
    }

    onTypeChange(checked: boolean) {
        this.setState({
            buildingType: checked ? BuildingType.Residential : BuildingType.Academic
        })
    }

    onSubmit() {
        this.setState({
            send: true
        })
    }

    onFinish() {
        this.setState({
            send: false
        })
    }
}