import React from "react";
import "./index.css"
import IconType from "../../../../../Components/Icon/IconTypes";
import NumberInput from "../../../../../Components/NumberInput";
import Button from "../../../../../Components/Button";
import Wrapper from "./Wrapper";
import LocationNameInput from "./LocationNameInput";
import DisplayInput from "./DisplayInput";
import ILocationSetupState from "./ILocationSetupState";
import IState from "../../../../../Store/IState";
import { addToCartAction } from "../../../../../Store/Cart/actions";
import { connect, ConnectedProps } from "react-redux";
import ContactLogPricingStrategy from "../../../../LearnMorePage/PricingSection/ContactLogPricing/ContactLogPricingStrategy";
import TextInput from "../../../../../Components/TextInput";
import FormValue from "../../../../../Components/FormInput/FormValue";

class LocationSetup extends React.Component<Props, ILocationSetupState> {
    private locationInputRef: React.RefObject<TextInput>;
    private displayInputRef: React.RefObject<DisplayInput>;

    constructor(props: Props) {
        super(props);
        this.state = {
            location: "",
            counts: []
        }
        this.onDisplayInput = this.onDisplayInput.bind(this);
        this.onLocationNameChange = this.onLocationNameChange.bind(this);
        this.addLocationToCart = this.addLocationToCart.bind(this);
        this.locationInputRef = React.createRef();
        this.displayInputRef = React.createRef();
    }

    render() {
        return (
            <Wrapper>
                <LocationNameInput inputRef={this.locationInputRef} onChange={this.onLocationNameChange} />
                <DisplayInput ref={this.displayInputRef} onChange={this.onDisplayInput} displayTypes={["wall", "table", "standing"]} />
                <Button onClick={this.addLocationToCart}>Add To Cart</Button>
            </Wrapper>
        )
    }

    addLocationToCart() {
        if (this.isValidLocation()) {
            const pricingStrategy = new ContactLogPricingStrategy();
            const priceBreakdown = pricingStrategy.getPriceBreakdown();
            this.props.addItemToCart({
                name: this.state.location,
                description: this.getDescription(priceBreakdown),
                price: this.getPrice(priceBreakdown),
                quantity: 1,
                productImage: this.getProductImage(),
                id: ""
            })
            this.locationInputRef.current?.setState({
                text: new FormValue("", false)
            });
            this.displayInputRef.current?.setState({
                counts: ["wall", "table", "standing"].map((displayType) => {
                    return [displayType, 0]
                })
            })
        }
    }

    getProductImage() {
        const maxCount = this.state.counts.reduce((maxCount, count) => {
                return maxCount[1] >= count[1] ? maxCount : count;
        }, this.state.counts[0])
        return `/${maxCount[0].toLowerCase()}-display.png`
    }

    isValidLocation() {
        return this.state.location !== "" && this.state.counts.reduce<boolean>((isValidCount, count) => {
            return isValidCount || (count[1] > 0 && !isNaN(count[1]))
        }, false)
    }

    getDescription(priceBreakdown: Map<string, number>) {
        return this.state.counts
            .filter((count) => {
                return !isNaN(count[1]) && count[1] !== 0;
            })
            .reduce((displayStringBuilder: string[], count) => {
                const countPrice = (priceBreakdown.get(count[0]) as number * count[1]).toFixed(2);
                return [
                    ...displayStringBuilder, 
                    `${isNaN(count[1]) ? 0 : count[1]}x ${count[0]} display $${countPrice}`]
            }, [])
            .join("\n")
    }

    getPrice(priceBreakdown: Map<string, number>) {
        return this.state.counts.reduce<number>((currentPrice: number, count : [string, number]) => {
            return currentPrice + (priceBreakdown.get(count[0]) as number * count[1]);
        }, 0);
    }

    getInput() {
        return (
            <NumberInput 
                id="wall-displays"
                onChange={() => {}} 
                label={"Wall Displays"}
                placeHolder={"Enter wall displays for this location"}
                icon={IconType.Image} />
        )
    }

    onLocationNameChange(location: string) {
        this.setState({ location });
    }

    onDisplayInput(counts: [string, number][]) {
        this.setState({ counts });
    }
}

const mapState = (state : IState) => {
    return {}
}

const mapDispatch = {
    addItemToCart: addToCartAction
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux;

export default connector(LocationSetup)