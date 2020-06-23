import IconType from "./IconTypes";
import { ReactComponent as Phone } from "./svgs/phone.svg";
import { ReactComponent as Mail } from "./svgs/mail.svg";
import { ReactComponent as Dropdown } from "./svgs/dropdown.svg";
import { ReactComponent as Clock } from "./svgs/clock.svg";
import { ReactComponent as Menu } from "./svgs/menu.svg";
import { ReactComponent as Calendar } from "./svgs/calendar.svg";
import { ReactComponent as Lock } from "./svgs/lock.svg";
import { ReactComponent as User } from "./svgs/user.svg";
import { ReactComponent as Info } from "./svgs/info.svg";
import { ReactComponent as Dashboard } from "./svgs/dashboard.svg";
import { ReactComponent as Shopping } from "./svgs/shopping-cart.svg";
import { ReactComponent as Settings } from "./svgs/settings.svg";
import { ReactComponent as LogOut } from "./svgs/log-out.svg";
import { ReactComponent as Help } from "./svgs/help.svg";
import { ReactComponent as ClipboardList } from "./svgs/clipboard-list.svg";
import { ReactComponent as OpenMenu } from "./svgs/book-open.svg";
import { ReactComponent as Shop } from "./svgs/shop.svg";
import { ReactComponent as CreditCard } from "./svgs/credit-card.svg";
import { ReactComponent as Users } from "./svgs/users.svg";
import { ReactComponent as QRCode } from "./svgs/qr-code.svg";
import { ReactComponent as Image } from "./svgs/image.svg";
import { ReactComponent as Link } from "./svgs/link.svg";

const IconMapping = new Map<IconType, any>();
IconMapping.set(IconType.Mail, Mail);
IconMapping.set(IconType.Phone, Phone);
IconMapping.set(IconType.Dropdown, Dropdown);
IconMapping.set(IconType.Clock, Clock);
IconMapping.set(IconType.Menu, Menu);
IconMapping.set(IconType.Calendar, Calendar);
IconMapping.set(IconType.Lock, Lock);
IconMapping.set(IconType.User, User);
IconMapping.set(IconType.Info, Info);
IconMapping.set(IconType.Dashboard, Dashboard);
IconMapping.set(IconType.Shopping, Shopping);
IconMapping.set(IconType.Settings, Settings);
IconMapping.set(IconType.Logout, LogOut);
IconMapping.set(IconType.Help, Help);
IconMapping.set(IconType.ClipboardList, ClipboardList);
IconMapping.set(IconType.OpenMenu, OpenMenu);
IconMapping.set(IconType.Shop, Shop);
IconMapping.set(IconType.CreditCard, CreditCard);
IconMapping.set(IconType.Users, Users);
IconMapping.set(IconType.QRCode, QRCode);
IconMapping.set(IconType.Image, Image);
IconMapping.set(IconType.Link, Link);

export default IconMapping;