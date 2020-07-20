import React from "react";
import Button from "../../../Components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IPurchaseButtonProps from "./IPurchaseButtonProps";
import AppHistory from "../../../AppHistory";
import "./index.css"

export default class PurchaseButton extends React.Component<IPurchaseButtonProps> {
    constructor(props: IPurchaseButtonProps) {
        super(props);
        this.directToPurchase = this.directToPurchase.bind(this);
    }

    render() {
        return (
            <Button onClick={this.directToPurchase}>
                <span className="purchase-text">Purchase</span><FontAwesomeIcon className="purchase-icon" icon="chevron-right"/>
            </Button>
        )
    }

    private directToPurchase() {
        AppHistory.push(`/purchase/${this.props.productName}`)
    }
}