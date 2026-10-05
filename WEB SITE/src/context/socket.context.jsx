import { createContext, createSignal, createEffect, onMount, useContext, createMemo } from "solid-js";

import { io } from "socket.io-client";
import { UseAuthCtx } from "./auth.context";
import { SOCKET_TAG } from "../json/socket-tag-json";
import { UseDataCtx } from "./data.context";

export const SocketCtx = createContext();

export function SocketCtxProv(props) {

    const [nodeSocket, setNodeSocket] = createSignal();
    const { data, setData } = UseDataCtx();
    const { auth } = UseAuthCtx();
    const [millis, setMillis] = createSignal(1.5);
    const [image, setImage] = createSignal();

    const UpdateMillis = () => {
        var state = new Date().getMilliseconds() - millis() < 1500 ? "Online" : "Offline"
        setMillis(new Date().getMilliseconds())
        return state;
    }

    createEffect(
        () => {
            if (nodeSocket() && auth() && auth().token) {
                nodeSocket().emit(SOCKET_TAG.refresh, { userId: auth().id, name: auth().name, role: auth().role })
            }
        }
    )

    createEffect(
        async () => {

            if (auth() && auth().token) {

                const conn = io(`${import.meta.env.VITE_SOCKET_SERVER_HOST}`)
                setNodeSocket(
                    await conn
                )

                nodeSocket().on("connect", () => {

                    // console.log(`connected to socket server ${import.meta.env.VITE_SOCKET_SERVER_HOST}`)
                    console.log(`connected to socket server`)

                    nodeSocket().on(SOCKET_TAG.pltsPV, (value) => {
                        value.payload.state = UpdateMillis();
                        setData({ ...data(), [SOCKET_TAG.pltsPV]: value.payload })
                        // console.log("SocketCtxProv/createEffect", SOCKET_TAG.pltsPV, data())
                    })

                    nodeSocket().on(SOCKET_TAG.pltsOffGrid, (value) => {
                        value.payload.state = UpdateMillis();
                        setData({ ...data(), [SOCKET_TAG.pltsOffGrid]: value.payload })
                        // console.log("SocketCtxProv/createEffect", SOCKET_TAG.pltsOffGrid, data())
                    })

                    nodeSocket().on(SOCKET_TAG.pltsOnGrid, (value) => {
                        value.payload.state = UpdateMillis();
                        setData({ ...data(), [SOCKET_TAG.pltsOnGrid]: value.payload })
                        // console.log("SocketCtxProv/createEffect", SOCKET_TAG.pltsOffGrid, data())
                    })

                    nodeSocket().on(SOCKET_TAG.pltb, (value) => {
                        value.payload.state = UpdateMillis();
                        setData({ ...data(), [SOCKET_TAG.pltb]: value.payload })
                        // console.log("SocketCtxProv/createEffect", SOCKET_TAG.pltb, data())
                    })

                    nodeSocket().on(SOCKET_TAG.pltmh, (value) => {
                        value.payload.state = UpdateMillis();
                        setData({ ...data(), [SOCKET_TAG.pltmh]: value.payload })
                        // console.log("SocketCtxProv/createEffect", SOCKET_TAG.pltmh, value.payload)
                    })

                    nodeSocket().on("webcam", (value) => {
                        setImage(value);
                        // console.log("receive webcam")
                    })

                })

                nodeSocket().on("disconnect", () => {
                    console.log(`disconnecting from socket server ${import.meta.env.VITE_SOCKET_SERVER_HOST}`)
                })
            }

        }

    )

    return (
        <SocketCtx.Provider value={{ nodeSocket, setNodeSocket, millis, image }}>
            {props.children}
        </SocketCtx.Provider>
    )

}

export function UseSocketCtx() {
    return useContext(SocketCtx);
}