import IconType from "./IconTypes";
import { ReactComponent as Phone } from "./phone.svg";
import { ReactComponent as Mail } from "./mail.svg";
import { ReactComponent as Dropdown } from "./dropdown.svg";
import { ReactComponent as Clock } from "./clock.svg";
import { ReactComponent as Menu } from "./menu.svg";
import { ReactComponent as Calendar } from "./calendar.svg";
import { ReactComponent as Lock } from "./lock.svg";
import { ReactComponent as User } from "./user.svg";

const IconMapping = new Map<IconType, any>();
IconMapping.set(IconType.Mail, Mail);
IconMapping.set(IconType.Phone, Phone);
IconMapping.set(IconType.Dropdown, Dropdown);
IconMapping.set(IconType.Clock, Clock);
IconMapping.set(IconType.Menu, Menu);
IconMapping.set(IconType.Calendar, Calendar);
IconMapping.set(IconType.Lock, Lock);
IconMapping.set(IconType.User, User)

export default IconMapping;