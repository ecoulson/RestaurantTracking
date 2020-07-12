import React from "react";
import { ReactComponent as TriangleSVG } from "./triangle-bottom.svg";
import "./index.css";

export default class TriangleBottom extends React.Component {
    render() {
        return <TriangleSVG className="triangle-bottom" />
    }
}