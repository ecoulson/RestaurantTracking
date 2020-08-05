import Axios from "axios";
import Cookie from "../lib/Cookie";
import IUser from "./IUser";

export async function getSessionUser() {
    try {
        const res = await Axios.get(`/api/user/session`, {
            headers: {
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });
        return res.data.data as IUser
    } catch (error) {
        throw error;
    }
}

export async function getUserAvatar(id: string) {
    try {
        const res = await Axios.get(`/api/user/avatar/${id}`, {
            responseType: 'blob',
            headers: {
                "Authorization": `Bearer ${Cookie.getCookie("token")}`
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function isSessionActive(unverified?: boolean) {
    try {
        const res = await Axios.get(`/api/authentication/is_session_active${unverified ? `?allowUnverified=true` : ""}`)
        return res.data.data.isActive
    } catch (error) {
        throw error;
    }
}

export async function getAllRestaurants() {
    try {
        const res = await Axios.get("/api/restaurant")
        return res.data.data.restaurants;
    } catch (error) {
        throw error;
    }
}