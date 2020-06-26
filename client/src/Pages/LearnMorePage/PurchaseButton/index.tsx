import React from "react";
import Submit from "../../../Components/Submit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IPurchaseButtonProps from "./IPurchaseButtonProps";
import AppHistory from "../../../AppHistory";

export default class PurchaseButton extends React.Component<IPurchaseButtonProps> {
    constructor(props: IPurchaseButtonProps) {
        super(props);
        this.directToPurchase = this.directToPurchase.bind(this);
    }

    render() {
        return (
            <Submit onClick={this.directToPurchase}>
                Purchase <FontAwesomeIcon icon="chevron-right" color="white"/>
            </Submit>
        )
    }

    private directToPurchase() {
        AppHistory.push(`/purchase/${this.props.productName}`)
    }
}