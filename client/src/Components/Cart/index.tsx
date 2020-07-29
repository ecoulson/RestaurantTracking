import React from "react";
import "./index.css";
import CartContainer from "./CartContainer";
import CartTitle from "./CartTitle";
import CartPrice from "./CartPrice";
import CartItems from "./CartItems";

export default class Cart extends React.Component {
    render() {
        return (
            <CartContainer>
                <CartTitle />
                <CartItems>
                    
                </CartItems>
                <CartPrice />
            </CartContainer>
        )
    }
}