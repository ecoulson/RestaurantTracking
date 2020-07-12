import { ReactComponent as TriangleSVG } from "./triangle-top.svg";
import React from "react";
import "./index.css";

export default class TriangleTop extends React.Component {
    render() {
        return (
            <TriangleSVG className="triangle-top" />
        );
    }
}