import React from "react";
import Submit from "../../../Components/Submit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class PurchaseButton extends React.Component {
    render() {
        return (
            <Submit visible={true} onClick={() => {}}>
                Purchase <FontAwesomeIcon icon="chevron-right" color="white"/>
            </Submit>
        )
    }
}