import React from "react";
import SimpleFileInput from "../SimpleFileInput";
import "./index.css";
import IImageUploaderState from "./IImageUploaderState";
import IImageUploaderProps from "./IImageUploaderProps";
import wait from "../../lib/Wait";

const MaxNameLength : number = 30;

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

    private handleChange(files : File[]) {
        this.setState({
            progress: 0
        }, () => {
            setTimeout(() => {
                if (files.length > 0) {
                    const image = files[0];
                    const fileReader = new FileReader();
                    fileReader.onload = this.handleLoad(fileReader, image);
                    fileReader.onprogress = this.handleProgress();
                    fileReader.onloadstart = this.handleLoadStart(image);
                    fileReader.readAsDataURL(image);
                }
            }, 250)
        })
    }

    private handleLoad(fileReader : FileReader, image: File) {
        return async () => {
            await this.asyncSetState({
                progress: 1,
                image: this.state.image
            });
            await wait(250);
            this.props.onImageUpload(fileReader.result as string, image);
            await wait(1000);
            await this.asyncSetState({
                progress: 0,
                image: this.state.image
            })
        }
    }

    private asyncSetState(newState: IImageUploaderState) {
        return new Promise((resolve) => {
            this.setState(newState, resolve)
        })
    }

    private handleProgress() {
        return (event: ProgressEvent) => {
            this.setState({
                progress: event.loaded / event.total
            })
        }
    }

    private handleLoadStart(image : File) {
        return () => {
            this.setState({
                image
            })
        }
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
            return this.getDisplayName();
        } else {
            return "Filename..."
        }
    }

    private getDisplayName() {
        if (!this.state.image) {
            throw new Error("Image not uploaded")
        }
        return this.state.image.name.length > MaxNameLength ?
            this.state.image.name.substring(0, MaxNameLength) + "..." :
            this.state.image.name;
    }
}