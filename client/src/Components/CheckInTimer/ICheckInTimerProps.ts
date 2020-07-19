import moment from "moment"

export default interface ICheckInTimerProps {
    startTime: Date;
    onTick?: (duration : moment.Duration) => void;
}