import Cookies from "js-cookie";
import { env_variable } from "../env";

export const removeUserCookie = () => {
    Cookies.remove('access_token' ,{path: "/", domain: env_variable.HOST_COOKIE_NAME});
    // Cookies.remove('access_token' ,{path: "/", domain: 'vnthread.fun'});

    Cookies.remove('user_package' ,{path: "/", domain: env_variable.HOST_COOKIE_NAME});
    Cookies.remove('refresh_token',{path: "/", domain: env_variable.HOST_COOKIE_NAME});
}