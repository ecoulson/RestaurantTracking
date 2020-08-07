import React from "react";
import SlideSwitch from "../../../../../../Components/SlideSwitch";
import NumberInput from "../../../../../../Components/NumberInput";
import IconType from "../../../../../../Components/Icon/IconTypes";
import IDisplayInputState from "./IDisplayInputState";
import IDisplayInputProps from "./IDisplayInputProps";
import "./index.css";

export default class DisplayInput extends React.Component<IDisplayInputProps, IDisplayInputState> {
    constructor(props: IDisplayInputProps) {
        super(props);
        this.state = {
            type: 0,
            counts: props.productPrices.map((productPrice) => {
                return [productPrice, 0]
            })
        }
        this.handleDisplayTypeChange = this.handleDisplayTypeChange.bind(this);
        this.getDisplayChangeHandler = this.getDisplayChangeHandler.bind(this);
    }

    render() {
        return (
            <>
                <div className="display-input-slide-switch-container">
                    <SlideSwitch optionWidth={100} onChange={this.handleDisplayTypeChange}>
                        {this.renderSwitchOptions()}
                    </SlideSwitch>
                </div>
                {this.renderImage()}
                {this.renderInput()}
            </>
        )
    }

    renderSwitchOptions() {
        return this.props.productPrices.map((productPrice, i) => {
            return <span key={i} className="display-type-option">{productPrice.product.name.split(" ")[0]}</span>
        })
    }

    handleDisplayTypeChange(type: number) {
        this.setState({ type })
    }

    renderImage() {
        const productPrice = this.props.productPrices[this.state.type];
        return (
            <img 
                className="display-image" 
                alt="Check in display"
                src={`/${productPrice.product.name.toLowerCase().split(" ").join("-")}.png`}/>
        )
    }

    renderInput() {
        const productPrice = this.props.productPrices[this.state.type];
        const value = this.state.counts[this.state.type][1];
        const price = productPrice.prices[0].unit_amount as number / 100
        return (
            <NumberInput 
                id={`${productPrice.product.id}`}
                value={isNaN(value) ? "" : value.toString()}
                onChange={this.getDisplayChangeHandler()} 
                hoverColor="black"
                label={`${this.capitalize(productPrice.product.name)} ($${price.toFixed(2)})`}
                placeHolder={`Enter ${productPrice.product.name.toLowerCase()} for this location`}
                icon={IconType.Image} />
        )
    }

    getDisplayChangeHandler() {
        return (displayCount: number) => {
            const productPrice = this.props.productPrices[this.state.type];
            this.setState({
                counts: this.state.counts.map((count) => {
                    if (count[0].product.id === productPrice.product.id) {
                        return [productPrice, displayCount]
                    } else {
                        return count;
                    }
                })
            }, () => {
                this.props.onChange(this.state.counts);
            })
        }
    }

    private capitalize(word: string) {
        return word.substring(0, 1).toUpperCase() + word.substring(1, word.length).toLowerCase();
    }
}