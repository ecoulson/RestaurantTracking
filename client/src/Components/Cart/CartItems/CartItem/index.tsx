import React from "react";
import ICartItemProps from "./ICartItemProps";
import "./index.css";

export default class CartItem extends React.Component<ICartItemProps> {
    render() {
        return (
            <div className="cart-item">
                <div className="cart-item-product-image-container">
                    <img className="cart-item-product-image" src={this.props.item.productImage} alt="product cart image" />
                </div>
                <div className="cart-item-description-container">
                    <h2 className="cart-item-name">{this.props.item.name}</h2>
                    <h3 className="cart-item-description">{
                        this.props.item.description.split("\n").map((item, i) => {
                            return <p key={i} className="cart-item-description-item">{item}</p>
                        })
                    }</h3>
                </div>
                {this.props.item.quantity > 1 ? 
                    (<div className="cart-item-quantity-container">
                        <span>{this.props.item.quantity}x</span>
                    </div>) : null 
                }
                <div className="cart-item-price-container">
                    <span>${this.props.item.price.toFixed(2)}</span>
                </div>
                {this.props.isCheckingOut ? null :
                    <div onClick={() => this.props.removeItem(this.props.item.id)} className="cart-item-remove-container">
                        <span>x</span>
                    </div>
                }
            </div>
        );
    }
}