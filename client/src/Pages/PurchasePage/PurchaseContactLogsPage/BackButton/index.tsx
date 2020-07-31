import React, { MouseEvent } from "react"
import Button from "../../../../Components/Button"
import IBackButtonProps from "./IBackButtonProps"

export default class BackButton extends React.Component<IBackButtonProps> {
    constructor(props: IBackButtonProps) {
        super(props);
        this.handleBackClick = this.handleBackClick.bind(this);
        this.setCartMode = this.setCartMode.bind(this);
    }

    render() {
        return this.props.page > 0 ? 
                <Button id="back" onClick={this.handleBackClick}>Back</Button> : 
                null
    }

    handleBackClick(e : MouseEvent) {
        (e.target as HTMLButtonElement).blur()
        this.props.onClick(this.props.page - 1)
        this.setCartMode()
    }

    setCartMode() {
        this.props.page - 1 === 2 ?
            this.props.setCheckoutMode() :
            this.props.setShopMode()
    }
}