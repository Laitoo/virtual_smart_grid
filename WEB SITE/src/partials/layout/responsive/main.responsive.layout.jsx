import { createEffect, createSignal, onMount, Show } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import { UseAuthCtx } from "~/context/auth.context";
import { menuRows } from "~/json/menu-json";
import { roles } from "~/json/role-json";

import { Toaster } from "solid-toast";
import MyNavBar from "~/partials/MyNavBar";
import Sidebar from "~/components/responsive/sidebar.responsive";

export default function MainLayoutResponsive(props) {

    const location = useLocation();
    const navigate = useNavigate();
    const { auth, loadUser } = UseAuthCtx();

    onMount(
        async () => {
            loadUser()
                .then(
                    resolve => {
                        if (auth() && auth().username === undefined) navigate(import.meta.env.VITE_REDIRECT_TO_HOME);
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
        <div class="flex h-screen bg-gray-600">
            {/* Sidebar */}
            <Show when={location.pathname !== "/" && location.pathname !== "/about" && location.pathname !== "/login"}>
                <Sidebar items={menuRows} />
            </Show>

            {/* Main Content */}
            <div class="flex-1 flex flex-col overflow-hidden">
                {/* Header with toggle button */}
                <MyNavBar />

                {/* Page content */}
                <main class="flex-1 w-full min-h-auto overflow-y-auto bg-gray-100 p-4xx">
                    <div class="mt-x">
                        {/* Your main content goes here */}
                        <Toaster />
                        {props.children}
                    </div>
                </main>

            </div>
        </div>
    );
}