import React, { MouseEvent } from "react";
import INextButtonProps from "./INextButtonProps";
import Button from "../../../../Components/Button";

export default class NextButton extends React.Component<INextButtonProps> {    
    constructor(props : INextButtonProps) {
        super(props);
        this.handleNextClick = this.handleNextClick .bind(this);
        this.setCartMode = this.setCartMode.bind(this);
    }

    render() {
        return this.getButtons();
    }

    handleNextClick(e : MouseEvent) {
        e.preventDefault();
        if (this.props.canProgress()) {
            (e.target as HTMLButtonElement).blur()
            this.props.onClick(this.props.page + 1)
            this.setCartMode()
        } else {
            this.props.showError();
        }
    }

    setCartMode() {
        this.props.page + 1 === 2 ?
            this.props.setCheckoutMode() :
            this.props.setShopMode()
    }

    getButtons() {
        switch (this.props.page) {
            case 0:
                return <Button id="next" onClick={this.handleNextClick}>Next</Button>
            case 1:
                return <Button id="next" onClick={this.handleNextClick}>Checkout</Button>
            case 2:
                return <Button id="next" onClick={this.props.onSubmit}>Complete</Button>
        }
    }
}