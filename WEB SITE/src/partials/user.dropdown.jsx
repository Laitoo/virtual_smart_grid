import { Show } from "solid-js";
import { UseAuthCtx } from "~/context/auth.context"
import { roles } from "~/json/role-json";

export default function UserDropdown(props) {

    const { logout } = UseAuthCtx();
    const { auth } = UseAuthCtx()

    const Item = (props) => {
        return (

            props.url ? <a href={props.url} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                {props.label}
            </a>
                : <p onClick={() => props.callback()} class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    {props.label}
                </p>

        )
    }

    return (
        <div class={`absolute z-10 right-4 mt-48 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${props.hidden ? "hidden" : ""}`}>
            <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <Item label={"Profile"} url={"/profile"} />
                <Show when={ auth() && ["root","admin", "dosen", "asisten"].findIndex( role => role === auth().role) > 0 }>
                    <Item label={"Pengaturan User"} url={"/users"} />
                </Show>
                <Item label={"Logout"} callback={() => logout()} />
            </div>
        </div>
    )
}