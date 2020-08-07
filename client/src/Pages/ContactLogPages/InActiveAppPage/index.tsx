import React from "react";
import Instructions from "../Components/Instructions";
import OrganizationName from "../Components/OrganizationName";
import InActiveAppPageProps from "./InActiveAppPageProps";

export default class InActiveAppPage extends React.Component<InActiveAppPageProps> {
    render() {
        return (
            <>
                <OrganizationName organizationId={this.props.match.params.organizationId}/>
                <Instructions>This App is currently in active. Please contact the establishment that runs this application for more information.</Instructions>
            </>
        )
    }
}