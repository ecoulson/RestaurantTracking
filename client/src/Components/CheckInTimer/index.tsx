import React from "react";
import ICheckInTimerProps from "./ICheckInTimerProps";
import ICheckInTimerState from "./ICheckInTimerState";
import moment from "moment";
import "./index.css";

export default class CheckInTimer extends React.Component<ICheckInTimerProps, ICheckInTimerState> {
    constructor(props : ICheckInTimerProps) {
        super(props);
        this.state = {
            timer: null,
            timerDuration : this.getDuration(props.startTime)
        }
    }

    componentWillMount() {
        this.setState({
            timer: setInterval(() => {
                this.setState({
                    timerDuration: this.getDuration(this.props.startTime)
                }, () => {
                    if (this.props.onTick) {
                        this.props.onTick(this.state.timerDuration)
                    }
                })
            }, 1000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render() {
        return (
            <div className="check-in-timer">
                {this.state.timerDuration.asHours() >= 1 ? 
                    <>
                        {this.renderField(this.state.timerDuration.asHours())}
                        <span className="check-in-timer-colon">:</span>
                    </> : null
                }
                {this.renderField(this.state.timerDuration.minutes())}
                
                {this.state.timerDuration.asHours() < 1 ?
                    <> 
                        <span className="check-in-timer-colon">:</span>
                        {this.renderField(this.state.timerDuration.seconds())}
                    </> : null
                }
            </div>
        )
    }

    renderField(value : number) {
        return (
            <>
                <span className="check-in-timer-field">{Math.floor(value / 10)}</span>
                <span className="check-in-timer-field">{Math.floor(value % 10)}</span>
            </>
        )  
    }

    getDuration(startTime : Date) {
        return moment.duration(moment().diff(moment(startTime)));
    }
}