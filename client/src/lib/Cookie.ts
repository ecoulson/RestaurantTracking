export default class Cookie {
    static setCookie(name : string, value : string, days? : number) {
        let expires = "";
        if (days !== undefined) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }


    static getCookie(name : string) {
        let nameEQ = name + "=";
        const cookies = document.cookie.split(';');
        for(let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    }

    static hasCookie(name: string) {
        return Cookie.getCookie(name) !== null;
    }

    static eraseCookie(name : string) {   
        Cookie.setCookie(name, "", 0)
    }
}