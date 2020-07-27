import React from "react";
import IRequestState from "../IRequestState";
import { AxiosError } from "axios";
import IResponse from "../IResponse";
import ToastType from "../../Components/Toast/ToastType";
import wait from "../../lib/Wait";
import IRequestProps from "../IRequestProps";
import IState from "../../Store/IState";
import { connect, ConnectedProps } from "react-redux";
import { addToast, removeToast } from "../../Store/Toast/actions";
import { IEnqueueToastAction } from "../../Store/Toast/types";

const MessageTimeOut = 5 * 1000; // 5 seconds

abstract class RequestComponent<P extends IRequestProps<T>, T = {}> extends React.Component<Props<P>, IRequestState> {
    constructor(props : Props<P>) {
        super(props);
        this.state = {
            completed: false,
            fetching: false
        }
    }

    componentWillReceiveProps(props : P) {
        if (this.state.completed && !props.send && !this.state.fetching) {
            this.setState({
                completed: false
            })
        }
    }

    componentDidMount() {
        if (this.props.send && !this.state.completed && !this.state.fetching) {
            this.sendRequest();
        }
    }

    async componentDidUpdate() {
        if (this.props.send && !this.state.completed && !this.state.fetching) {
            this.sendRequest();
        }
    }

    private async sendRequest() {
        let toast : IEnqueueToastAction | null = null;
        try {
            this.setState({
                fetching: true
            })
            toast = this.props.addToast(this.getFetchingMessage(), ToastType.Info);
            const response = await this.onLoad();
            this.props.removeToast(toast.id);
            await wait(500);
            this.setState({
                completed: true,
                fetching: false
            })
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
            if (toast) {
                this.props.removeToast(toast.id);
                await wait(500);
            }
            this.setState({
                completed: true,
                fetching: false
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
        return "";
    }

    getSuccessMessage() {
        return "";
    }

    getFetchingMessage() {
        return "";
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
        const toast = this.props.addToast(message, type)
        await wait(MessageTimeOut);
        this.props.removeToast(toast.id);
    }

    private isMappedError(error : AxiosError) {
        return error.response && this.getErrorStatusMessage().has(error.response.status)
    }

    protected abstract async onLoad() : Promise<IResponse<T>>;

    render() {
        return null;
    }
}

const mapState = (state : IState) => {
    return {}
}

const mapDispatch = {
    addToast: addToast,
    removeToast: removeToast
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props<P> = PropsFromRedux & P;

export default RequestComponent