import MyNavBar from "../MyNavBar";
// import Sidebar from "../sidebar"
import Sidebar from "../../components/responsive/sidebar.responsive";

import { menuRows } from "../../json/menu-json"
import { createEffect, onMount, Show } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import { UseAuthCtx } from "~/context/auth.context";
import { roles } from "~/json/role-json";
import { Toaster } from "solid-toast";

export default function MainLayout(props) {

    const location = useLocation()
    const navigate = useNavigate();
    const { auth, loadUser } = UseAuthCtx()
 
    onMount(
        async () => {
            loadUser()
                .then(
                    resolve => {
                        if (auth() && auth().username === undefined) navigate(import.meta.env.VITE_REDIRECT_TO_HOME)
                    }
                )
        }
    )

    createEffect(
        () => {
            if (location.pathname !== "/" && location.pathname !== "/about") {
                if (!auth() || !auth().username) navigate(import.meta.env.VITE_REDIRECT_TO_LOGIN)
            }
            if (location.pathname === "/users" && auth() && auth().role === roles.praktikan) navigate(import.meta.env.VITE_REDIRECT_TO_HOME)
            // console.log("main.layout.jsx:createEffect",auth())
        }
    )

    return (
        <div class="flex flex-col md:flex-row">
            {/* <div class="grid grid-col md:flex-row"> */}
            <Show when={location.pathname !== "/" && location.pathname !== "/about" && location.pathname !== "/login"}>
                <aside class=" bg-gray-800 min-h-screen sticky top-0 ">
                    <Sidebar menuItems={menuRows} />
                </aside>
            </Show>
            <main class="flex-1 w-full">
                <MyNavBar />
                <div class="mt-x">
                    <Toaster />
                    {props.children}
                </div>
            </main>
        </div>
    )
}