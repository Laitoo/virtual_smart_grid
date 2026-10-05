import { useLocation } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import { UseAuthCtx } from "~/context/auth.context";
import HistoriesDropdown from "./histories/histories.dropdown";

const MyNavBar = () => {

    const location = useLocation();
    const { auth } = UseAuthCtx();
    const [hidden, setHidden] = createSignal(true);
    const active = (path) => path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";

    return (
        <header class="flex justify-between items-center bg-white shadow-md">
            <div class="">
                <ul class="container flex h-full items-center p-3 text-black">
                    <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
                        <a href="/">Home</a>
                    </li>
                    <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
                        <a href="/about">About</a>
                    </li>
                    {/* <Show when={auth() && auth().username}>
                        <li class={`border-b-2 ${active("/histories")} mx-1.5 sm:mx-6`}>
                            <a href="/histories">Histories</a>
                            <button class="" onClick={() => setHidden(!hidden()) }>
                                <h1 class="">Histories</h1>
                            </button>
                            <HistoriesDropdown hidden={hidden()}  callback={ () => setHidden(!hidden()) }/>
                        </li>
                    </Show> */}
                </ul>
            </div>
            <div class="flex flex-row justify-center items-center h-full">
                <img
                    src="../lengkap-utama.png"
                    alt="Logo"
                    class="w-45 h-12 mb-4"
                />
            </div>
        </header>
    );
};

export default MyNavBar;