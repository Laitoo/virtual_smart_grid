import { AuthCtxProv } from "./auth.context";
import { DataCtxProv } from "./data.context";
import { MsgCtxProv } from "./msg.context";
import { SocketCtxProv } from "./socket.context";

export function RootCtxProvider(props) {

    return (
        <MsgCtxProv>
            <DataCtxProv>
                <AuthCtxProv>
                    <SocketCtxProv>
                        {props.children}
                    </SocketCtxProv>
                </AuthCtxProv>
            </DataCtxProv>
        </MsgCtxProv>
    )
}