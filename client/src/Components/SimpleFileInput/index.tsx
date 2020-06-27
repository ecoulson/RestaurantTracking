import React, { ChangeEvent, createRef, RefObject } from "react";
import ISimpleFileInputProps from "./ISimpleFileInputProps";
import ISimpleFileInputState from "./ISimpleFileInputState";
import "./index.css";

export default class SimpleFileInput extends React.Component<ISimpleFileInputProps, ISimpleFileInputState> {
    private inputRef : RefObject<HTMLInputElement>;

    constructor(props : ISimpleFileInputProps) {
        super(props);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.state = {
            files: []
        }
        this.inputRef = createRef<HTMLInputElement>();
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div onClick={this.handleClick} className="simple-file-input">
                <input 
                    ref={this.inputRef}
                    multiple={this.props.multiple}
                    className="native-simple-file-input"
                    onChange={this.handleFileUpload} 
                    accept={this.getAcceptedFilesString()} 
                    type="file" />
                {this.props.children}
            </div>
        )
    }

    private handleClick() {
        if (this.inputRef) {
            this.inputRef.current?.click()
        }
    }

    private handleFileUpload(event : ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            this.props.onChange([])
            this.setState({
                files: []
            })
        } else {
            const files = Array.from(event.target.files);
            this.props.onChange(files)
            this.setState({ files });
        }
    }

    private getAcceptedFilesString() {
        if (this.props.accept) {
            return this.props.accept.join(",");
        }
        return "";
    }
}