import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router"; // Import useNavigate
import style from "../css/hero.module.css";
import { UseAuthCtx } from "~/context/auth.context";
import FormLogin from "~/partials/login";

export default function Login(props) {

    const { auth } = UseAuthCtx();
    const navigate = useNavigate(); // Initialize navigate function

    onMount(
        () => {
            if (auth() && auth().username) navigate("/dashboard")
        }
    )

    return (
        <div class="relative h-screen w-full bg-gray-800">
            {/* Background Image */}
            <img src="/update.jpg" alt="Background" class="absolute inset-0 h-full w-full object-cover" />

            {/* Overlay */}
            <div class="absolute inset-0 bg-black bg-opacity-10"></div>

            {/* Content */}
            <div class="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
                <div class="flex flex-row-reverse bg-green-300x w-full">
                <FormLogin />
                </div>
            </div>
        </div>
    )
}