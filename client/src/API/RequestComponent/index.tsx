import React from "react";
import IRequestState from "../IRequestState";
import { AxiosError } from "axios";
import IResponse from "../IResponse";
import ToastType from "../../Components/Toast/ToastType";
import Toast from "../../Components/Toast";
import wait from "../../lib/Wait";
import IRequestProps from "../IRequestProps";

const MessageTimeOut = 5 * 1000; // 5 seconds

export default abstract class RequestComponent<P extends IRequestProps<T>, T = {}> extends React.Component<P, IRequestState> {
    constructor(props : P) {
        super(props);
        this.state = {
            message: "",
            unMounting: false,
            type: ToastType.Error,
            completed: false
        }
    }

    componentWillReceiveProps(props : P) {
        if (this.state.completed && !props.send) {
            this.setState({
                completed: false
            })
        }
    }

    componentDidMount() {
        if (this.props.send && !this.state.completed) {
            this.sendRequest();
        }
    }

    async componentDidUpdate() {
        if (this.props.send && !this.state.completed) {
            this.sendRequest();
        }
    }

    componentWillUnmount() {
        this.setState({
            unMounting: true
        })
    }

    private async sendRequest() {
        try {
            const response = await this.onLoad();
            if (!this.state.unMounting) {
                this.setState({
                    completed: true
                })
            }
            if (!response.success) {
                this.displayError(this.getFailureMessage());
                if (this.props.onError) {
                    this.props.onError(response);
                }
            } else {
                this.displaySuccess(this.getSuccessMessage());
                if (this.props.onComplete) {
                    this.props.onComplete(response);
                }
            }
        } catch (error) {
            this.setState({
                completed: true
            })
            this.handleError(error);
            if (this.props.onError) {
                this.props.onError(error);
            }
        }
    }

    getErrorStatusMessage() {
        return new Map<number, string>();
    }

    getFailureMessage() : string {
        return "Failure";
    }

    getSuccessMessage() {
        return "Success";
    }

    private async handleError(error : AxiosError) {
        if (this.isMappedError(error)) {
            this.displayError(this.getErrorStatusMessage().get(error.response!.status) as string);
        } else {
            this.displayError(this.getFailureMessage())
        }
    }

    private async displaySuccess(message: string) {
        await this.displayMessage(message, ToastType.Success);
    }

    private async displayError(message: string) {
        await this.displayMessage(message, ToastType.Error);
    }

    private async displayMessage(message: string, type: ToastType) {
        if (!this.props.redirect || type === ToastType.Error) {
            if (!this.state.unMounting) {
                this.setState({ message, type })
            }
            await wait(MessageTimeOut);
            if (!this.state.unMounting) {
                this.setState({ 
                    message: "",
                })
            }
        }
    }

    private isMappedError(error : AxiosError) {
        return error.response && this.getErrorStatusMessage().has(error.response.status)
    }

    protected abstract async onLoad() : Promise<IResponse<T>>;

    render() {
        return <Toast type={this.state.type} message={this.state.message} />
    }
}