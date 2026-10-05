import { UseAuthCtx } from "~/context/auth.context";
import UserDropdown from "../partials/user.dropdown";
import { createSignal, Show } from "solid-js";
import Popup from "./Popup";

export default function Header(props) {
  const { auth } = UseAuthCtx();
  const [hidden, setHidden] = createSignal(true);
  const [stateOff, setStateOff] = createSignal(false);
  const [stateOn, setStateOn] = createSignal(false);

  return (
    <div class="flex flex-col justify-between items-center mb-4 w-full">
      <div class="flex flex-row justify-between items-center mb-4 w-full">
        <div class="">
          <h1 class="text-xl font-bold">Fakultas Teknik Elektro</h1>
        </div>
        <div class="flex items-center">
          <span class="mr-2 font-bold">
            <div class="flex flex-row justify-center items-center">
              <div class="">{auth() && auth().username}</div>
            </div>
          </span>
          <button class="" onClick={() => setHidden(!hidden())}>
            <img
              src={"/profile.png"}
              alt="User Avatar"
              class="w-10 h-10 rounded-full"
            />
          </button>
          <UserDropdown hidden={hidden()} />
        </div>
      </div>
      <div class="flex flex-row justify-between items-center mb-4 w-full">
        <div class="grow h-14 ..."></div>
        <div class="grow-0 h-14 ...">
          <h1 class="text-xl font-bold">{props.title}</h1>
        </div>
        <div class="grow h-14 ...">
          <div class="flex justify-end w-full">
            <Show when={props.title === "PV"}>
              <button
                onclick={() => {
                  setStateOff(!stateOff());
                }}
              >
                <img
                  src="/popupoff.png"
                  alt="User Avatar"
                  class="w-10 h-10 rounded-full"
                />
              </button>
              <button
                onclick={() => {
                  setStateOn(!stateOn());
                }}
              >
                <img
                  src="/popupon.png"
                  alt="User Avatar"
                  class="w-10 h-10 rounded-full"
                />
              </button>
            </Show>
          </div>
        </div>
      </div>

      {/* Popup Offgrid */}
      <Show when={stateOff()}>
        <div class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-40"> 
          <Popup title="Offgrid" onClose={() => setStateOff(false)} />
        </div>
      </Show>

      {/* Popup Ongrid */}
      <Show when={stateOn()}>
        <div class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-40">
          <Popup title="Ongrid" onClose={() => setStateOn(false)} />
        </div>
      </Show>
    </div>
  );
}
