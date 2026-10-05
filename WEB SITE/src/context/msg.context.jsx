import { createContext, createEffect, createSignal, useContext } from "solid-js";

export const MsgCtx = createContext();

export function MsgCtxProv(props) {

    const [msg, setMsg] = createSignal([]);

    const MsgInsert = (data) => {
        setMsg(
            (prev) => [...prev, data]
        )
    }

    const MsgExist = () => {
        return msg().length > 0
    }

    return (
        <MsgCtx.Provider value={{ msg, setMsg, MsgExist, MsgInsert }}>
            {props.children}
        </MsgCtx.Provider>
    )
}

export function UseMsgCtx() {
    return useContext(MsgCtx);
}