import { createContext, createSignal, useContext } from "solid-js";
import toast from "solid-toast";
import { db } from "~/lib/db";

export const DataCtx = createContext();

export function DataCtxProv(props) {

    const [plts] = createSignal();
    const [pltb] = createSignal();
    const [pltmh] = createSignal();
    const [users, setUsers] = createSignal([]);

    const initialValue = {
        plts, pltb, pltmh
    }

    const togglePassword = (id) => {
        setUsers(users().map(user =>
            user.id === id ? { ...user, showPassword: !user.showPassword } : user
        ));
    }

    const findAllUser = async (token) => {
        const response = await db.user.findAll(token);
        if (response.data) {
            // console.log("data.contex.jsx:findAllUser",response.data);
            setUsers(response.data);
        }
    }

    const command = async (group, data, token) => {
        // console.log("command was send...")
        const response = await db.command[group](data, token);
        if (response.error ) {
            toast.success(`send ${data.tag} command, ${response.message}`, {
                position: "top-center",
                style: {
                    backgroundColor: "red",
                    fontSize: "24px",
                },
            });
        }
        if (response.data) {
            toast.success(`send ${data.tag} command`, {
                position: "top-center",
                style: {
                    backgroundColor: "green",
                    fontSize: "24px",
                },
            });
        }
    }

    const [data, setData] = createSignal(initialValue);

    return (
        <DataCtx.Provider value={{ data, setData, command, findAllUser, users, togglePassword }}>
            {props.children}
        </DataCtx.Provider>
    )
}

export function UseDataCtx() {
    return useContext(DataCtx);
}