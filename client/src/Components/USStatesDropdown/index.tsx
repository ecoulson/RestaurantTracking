import React from "react";
import SearchableDropdownInput from "../SearchableDropdownInput";
import IUSStatesDropdownState from "./IUSStatesDropdownState";
import IconType from "../Icon/IconTypes";
import IFormValue from "../FormInput/IFormValue";
import IUSStatesDropdownProps from "./IUSStatesDropdownProps";

export default class USStatesDropdown extends React.Component<IUSStatesDropdownProps, IUSStatesDropdownState> {
    constructor(props: IUSStatesDropdownProps) {
        super(props);
        this.state = {
            states: ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'],
            filteredStates: ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
        }
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <SearchableDropdownInput 
                values={this.state.filteredStates}
                id="state-dropdown"
                onChange={this.onChange}
                icon={IconType.FlagRegular}
                placeholder="State..."
                label="State"/>
        )
    }

    onChange(index: IFormValue<number>, value?: string) {
        if (value) {
            this.setState({
                filteredStates: this.state.states.filter(
                    (state) => state.toLowerCase().includes(value.toLowerCase() as string))
            }, () => {
                this.props.onChange(this.state.filteredStates[0]);
            })
        } else {
            this.props.onChange(this.state.filteredStates[index.value]);
        }
    }
}