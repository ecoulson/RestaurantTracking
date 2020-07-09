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

export async function isSessionActive() {
    try {
        const res = await Axios.get(`/api/authentication/is_session_active`)
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

export async function cancelPasswordRecovery(email: string, token: string) {
    try {
        await Axios.get(
            `/api/user/password_recovery/cancel_recover?email=${email}&token=${token}`
        );
    } catch (error) {
        throw error;
    }
}

export async function confirmPasswordRecovery(email: string, token: string) {
    try {
        await Axios.get(
            `/api/user/password_recovery/confirm?email=${email}&token=${token}`
        )
    } catch (error) {
        throw error;
    }
}

export async function resetPassword(email: string, token: string, password: string) {
    try {
        await Axios.post("/api/user/password_recovery/reset", {
            password, email, token
        });
    } catch (error) {
        throw error;
    }
}

export async function handleSpamRegistration(email: string, token: string) {
    try {
        await Axios.get(
            `/api/user/verification/spam?email=${email}&token=${token}`
        );
    } catch (error) {
        throw error;
    }
}