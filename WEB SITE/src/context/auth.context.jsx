import { useNavigate } from "@solidjs/router";
import { createContext, createEffect, createSignal, onMount, useContext } from "solid-js";
import { db } from "~/lib/db";
import { UseMsgCtx } from "./msg.context";

export const AuthCtx = createContext();

export function AuthCtxProv(props) {

    const navigate = useNavigate();
    const ITEM_NAME = "user"
    const [auth, setAuth] = createSignal({});
    const { setMsg } = UseMsgCtx()

    const isLogin = () => {
        const ok = auth() && auth().username
        return ok
    }

    const login = (data) => {
        // console.log("auh.context,jsx:login",data);
        db.user.login(data).then(
            response => {
                // console.log(response);
                if ( response.data && response.data.name  ) {
                    const item = { id: response.data.id, username: response.data.name, role: response.data.role, token: response.data.token };
                    setAuth(item)
                    localStorage.setItem(ITEM_NAME, JSON.stringify(item));
                    setMsg()
                    navigate("/dashboard")
                } else {
                    console.log("auth.context.jsx",response)
                    setMsg(
                        response.message
                    )
                }
            }
        )

    }

    const logout = () => {
        setAuth(null);
        localStorage.removeItem(ITEM_NAME);
    }

    const loadUser = () => {
        const promise = new Promise((resolve, reject) => {
            const storedUser = localStorage.getItem(ITEM_NAME);
            if (storedUser) {
                setAuth(JSON.parse(storedUser));
                resolve({ state: true, msg: "Load user session ok" })
            }
        });
        return promise;
    };

    return (
        <AuthCtx.Provider value={{ auth, login, logout, isLogin, loadUser }}>
            {props.children}
        </AuthCtx.Provider>
    )
}

export function UseAuthCtx() {
    return useContext(AuthCtx);
}