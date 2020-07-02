import React from "react";
import SimpleFileInput from "../SimpleFileInput";
import "./index.css";
import IImageUploaderState from "./IImageUploaderState";
import IImageUploaderProps from "./IImageUploaderProps";

export default class ImageUploader extends React.Component<IImageUploaderProps, IImageUploaderState> {
    constructor(props : IImageUploaderProps) {
        super(props);
        this.state = {
            progress: 0,
            image: props.value ? props.value : null
        }
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <SimpleFileInput onChange={this.handleChange} accept={[".png", ".jpg", ".jpeg"]}>
                <div tabIndex={0} className={`image-file-uploader ${this.getCompleteClass()}`}>
                    <div style={this.getXTranslation()} className="image-file-uploader-progress"></div>
                    <div className="image-file-uploader-container">
                        <div className="image-file-uploader-button">Upload</div>
                        <span className="image-file-uploader-file-name">{this.getText()}</span>
                    </div>
                </div>
            </SimpleFileInput>
        )
    }

    // TODO: Refactor
    private handleChange(files : File[]) {
        this.setState({
            progress: 0
        }, () => {
            setTimeout(() => {
                if (files.length > 0) {
                    const image = files[0];
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                        this.setState({
                            progress: 1
                        }, () => {
                            setTimeout(() => {
                                this.props.onImageUpload(fileReader.result as string, image);
                                setTimeout(() => {
                                    this.setState({
                                        progress: 0
                                    })
                                }, 1000)
                            }, 250)
                        })
                    }
                    fileReader.onprogress = (event : ProgressEvent) => {
                        this.setState({
                            progress: event.loaded / event.total
                        })
                    }
                    fileReader.onloadstart = () => {
                        this.setState({
                            image,
                        })
                    }
                    fileReader.readAsDataURL(image);
                }
            }, 250)
        })
    }

    private getCompleteClass() {
        return this.state.progress === 1 ?
                "image-file-uploader-complete" : ""
    }

    private getXTranslation() {
        return {
            transform: `translateX(-${100 - this.state.progress * 100}%)`,
            transition: this.state.progress > 0 ? `transform 0.25s linear` : "",
        }
    }

    private getText() {
        if (this.state.image) {
            return this.state.image.name
        } else {
            return "Filename..."
        }
    }
}