import { A } from "@solidjs/router";
import { Index, Show } from "solid-js";
import { UseAuthCtx } from "~/context/auth.context";
import { UseSocketCtx } from "~/context/socket.context";

export default function Sidebar(props) {

  const { logout } = UseAuthCtx();
  const { image } = UseSocketCtx();

  const LiItem = (props) => {
    return (
      <li>
        <div class="">
          <A href={props.url}>{props.label}</A>
          <Show when={props.childs}>
            <ul class="space-y-2xx">
              <Index each={props.childs} fallback={<div>Loading...</div>}>
                {(child) => (
                  <li>
                    <div class="ml-4">
                      <A
                        href={child().url}
                        class="text-pretty font-light text-xs "
                      >
                        {child().label}
                      </A>
                    </div>
                  </li>
                )}
              </Index>
            </ul>
          </Show>
        </div>
      </li>
    );
  };

  const Head = () => {
    return (
      <div class="flex flex-row justify-center items-center p-4">
        <A href="/Dashboard" class="text-lg font-bold ">
          DASHBOARD
        </A>
      </div>

    )
  }

  const Nav = () => {
    return (
      <nav>
        <ul class="space-y-4 ">
          <Index each={props.menuItems} fallback={<div>Loading...</div>}>
            {(item) => (
              <LiItem
                label={item().label}
                url={item().url}
                childs={item().childs}
              />
            )}
          </Index>
        </ul>
      </nav>
    )
  }

  return (
    <div class=" bg-gray-800 min-h-screen sticky top-0 ">
      <div class="text-white ml-4 flex flex-col h-screen ">
        <div class="flex-none ">
          <Head />
        </div>
        <div class="grow w-full p-4 ">
          <Nav />
        </div>
        <div class="bg-gray-100">
          <Show when={image()}>
            <img src={image()} alt="image" width={150} height={100} />
          </Show>
        </div>
        <div class="p-4">
          <button
            class="flex items-center p-3 hover:bg-gray-700 rounded-md text-white"
            onClick={() => logout("/")}
          >
            <span class="material-icons mr-2">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
