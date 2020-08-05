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
import TextInput from "../../../../../Components/TextInput";
import FormValue from "../../../../../Components/FormInput/FormValue";
import { ProductType, AppType } from "../../../../../Store/Cart/types";
import ILocationSetupProps from "./ILocationSetupProps";
import IProductPrice from "../../../../../API/GetProductPricesRequest/IProductPrice";

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
                <DisplayInput ref={this.displayInputRef} onChange={this.onDisplayInput} productPrices={this.props.productPrices} />
                <Button onClick={this.addLocationToCart}>Add To Cart</Button>
            </Wrapper>
        )
    }

    addLocationToCart() {
        if (this.isValidLocation()) {
            this.props.addItemToCart({
                name: this.state.location,
                description: this.getDescription(),
                price: this.getPrice(),
                quantity: 1,
                productImage: this.getProductImage(),
                productType: ProductType.Physical,
                appType: AppType.ContactLogs,
                prices: this.getPrices()
            })
            this.locationInputRef.current?.setState({
                text: new FormValue("", false)
            });
            this.displayInputRef.current?.setState({
                counts: this.props.productPrices.map((productPrice) => {
                    return [productPrice, 0]
                })
            })
        }
    }

    getDescription() {
        return this.state.counts
            .filter((count) => count[1] > 0)
            .reduce<string[]>((description , count) => {
                return [...description, `${count[1]}x ${count[0].product.name}`]
            }, [])
            .join("\n")
    }

    getPrices() {
        return this.state.counts.map((count) => {
            return {
                priceId: count[0].prices[0].id,
                quantity: count[1]
            }
        })
    }

    getProductImage() {
        const maxCount = this.state.counts.reduce((maxCount, count) => {
                return maxCount[1] >= count[1] ? maxCount : count;
        }, this.state.counts[0])
        return `/${maxCount[0].product.name.toLowerCase().split(" ").join("-")}.png`
    }

    isValidLocation() {
        return this.state.location !== "" && this.state.counts.reduce<boolean>((isValidCount, count) => {
            return isValidCount || (count[1] > 0 && !isNaN(count[1]))
        }, false)
    }

    getPrice() {
        return this.state.counts.reduce<number>((currentPrice: number, count) => {
            return currentPrice + count[1] * (count[0].prices[0].unit_amount as number) / 100;
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

    onDisplayInput(counts: [IProductPrice, number][]) {
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

type Props = PropsFromRedux & ILocationSetupProps;

export default connector(LocationSetup)