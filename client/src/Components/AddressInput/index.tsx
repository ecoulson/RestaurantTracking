import React from "react"
import TextInput from "../TextInput"
import IconType from "../Icon/IconTypes"
import IAddressInputProps from "./IAddressInputProps"
import IAddressInputState from "./IAddressInputState"

export default class AddressInput extends React.Component<IAddressInputProps, IAddressInputState> {
    constructor(props : IAddressInputProps) {
        super(props);
        this.state = {
            addressLine1: "",
            addressLine2: "",
            city: "",
            zip: "",
            state: "",
            country: ""
        }

        this.onAddressLine1 = this.onAddressLine1.bind(this);
        this.onAddressLine2 = this.onAddressLine2.bind(this);
        this.onCity = this.onCity.bind(this);
        this.onZip = this.onZip.bind(this);
        this.onState = this.onState.bind(this);
        this.onCountry = this.onCountry.bind(this);
    }

    render() {
        return (
            <>
                <TextInput 
                    label="Address Line 1" 
                    autocomplete="address-line1"
                    id="address-line1"
                    name="address-line1"
                    placeholder="Enter address line 1..." 
                    icon={IconType.Home}
                    iconColor={this.props.iconColor} 
                    onChange={this.onAddressLine1}
                    hoverColor={this.props.hoverColor} />
                <TextInput 
                    label="Address Line 2" 
                    id="address-line2"
                    autocomplete="address-line2"
                    name="address-line2"
                    placeholder="Enter address line 2..." 
                    icon={IconType.BuildingSolid}
                    iconColor={this.props.iconColor} 
                    onChange={this.onAddressLine2}
                    hoverColor={this.props.hoverColor} />
                <div style={{display: "flex"}}>
                    <div style={{width: "60%", marginRight: "5%"}}>
                        <TextInput 
                            autocomplete="address-level2"
                            name="address-city"
                            label="City" 
                            id="address-city"
                            placeholder="Enter city name..." 
                            icon={IconType.CitySolid}
                            iconColor={this.props.iconColor} 
                            onChange={this.onCity}
                            hoverColor={this.props.hoverColor} />
                    </div>
                    <div style={{width: "30%", marginLeft: "5%"}}>
                        <TextInput 
                            id="address-zip"
                            name="address-zip"
                            autocomplete="postal-code"
                            label="Zip Code" 
                            placeholder="Enter zip code..." 
                            icon={IconType.AddressCardSolid}
                            iconColor={this.props.iconColor} 
                            onChange={this.onZip}
                            hoverColor={this.props.hoverColor} />
                    </div>
                </div>
            </>
        )
    }

    private onAddressLine1(addressLine1: string) {
        this.setState({ addressLine1 })
    }

    private onAddressLine2(addressLine2: string) {
        this.setState({ addressLine2 })
    }

    private onCity(city: string) {
        this.setState({ city })
    }

    private onZip(zip: string) {
        this.setState({ zip })
    }

    private onState(state: string) {
        this.setState({ state })
    }

    private onCountry(country: string) {
        this.setState({ country })
    }
}