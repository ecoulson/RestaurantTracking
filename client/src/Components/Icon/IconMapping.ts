import Mail from "./mail.svg";
import Phone from "./phone.svg";
import IconType from "./IconTypes";
import Dropdown from "./dropdown.svg";
import Clock from "./clock.svg";
import Menu from "./menu.svg";
import Calendar from "./calendar.svg";

const IconMapping = new Map<IconType, any>();
IconMapping.set(IconType.Mail, Mail);
IconMapping.set(IconType.Phone, Phone);
IconMapping.set(IconType.Dropdown, Dropdown);
IconMapping.set(IconType.Clock, Clock);
IconMapping.set(IconType.Menu, Menu);
IconMapping.set(IconType.Calendar, Calendar);

export default IconMapping;