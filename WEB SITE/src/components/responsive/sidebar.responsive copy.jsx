import { createEffect, createSignal } from "solid-js";
import { UseAuthCtx } from "~/context/auth.context";

export default function Sidebar(props) {

    const {auth} = UseAuthCtx();
    const [isCollapsed, setIsCollapsed] = createSignal(false);

    createEffect(() => {
        // This effect can be used to handle any side effects related to the sidebar state
        // console.log("Sidebar isCollapsed:", props.items);
    })

    return (
        <div class={`${isCollapsed() ? "w-20" : "w-60" } hidden md:block h-full bg-gray-800 text-white transition-all duration-600 ease-in-out`}>
            <div class="p-4">
                <h2 class="text-2xl font-bold">Menu</h2>
                <nav class="mt-6">
                    <ul>
                        {
                            props.items.map(
                                (item, index) => (
                                    <li class="mb-2" key={index}>
                                        <a href={`${item.url}`} class="block px-4 py-2 hover:bg-gray-700 rounded cursor-pointer">
                                            {item.label}
                                        </a>
                                        {
                                            item.childs && item.childs.length > 0 ?
                                                <ul class="ml-4 mt-2 leading-3">
                                                    {
                                                        item.childs.map(
                                                            (child, childIndex) => (
                                                                <li class="mb-1 leading-snug" key={childIndex}>
                                                                    <a href={`${child.url}`} class="block px-4 py-1 hover:bg-gray-600 rounded cursor-pointer">
                                                                        {child.label}
                                                                    </a>
                                                                </li>
                                                            )
                                                        )
                                                    }       
                                                </ul>
                                                : ""
                                        }
                                    </li>
                                )
                            )
                        }
                    </ul>
                </nav>
            </div>
        </div>
    );
}