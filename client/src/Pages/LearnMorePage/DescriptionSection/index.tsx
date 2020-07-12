import React from "react";
import IDescriptionSectionProps from "./IDescriptionSectionProps";
import DescriptionSection from "./DescriptionSection";

export default class DescriptionSections extends React.Component<IDescriptionSectionProps> {
    render() {
        return this.renderSection();
    }

    renderSection() {
        return this.props.sections.map((section, i) => {
            return <DescriptionSection 
                    left={i % 2 === 0}
                    section={section} />
        })
    }
}