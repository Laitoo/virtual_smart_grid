import { Show } from "solid-js";
import { UseMsgCtx } from "~/context/msg.context"


export default function MesageViewer(props) {

    const { msg, setMsg } = UseMsgCtx(); 
    
    return (
        <Show when={msg()}>
            <div class="">
                <h1 class={`text-sm font-light`}>{msg()}</h1>
            </div>
        </Show>
    )
}