import { createMemo, createSignal, Show } from "solid-js"
import { UseAuthCtx } from "~/context/auth.context"

export default function FormUser(props) {

    const { auth } = UseAuthCtx()
    const [name, setName] = createSignal("")
    const [password, setPassword] = createSignal("")
    const [role, setRole] = createSignal("")

    createMemo(() => {
        if (auth()) {
            // console.log(auth())
            setName(auth().username)
            setPassword(auth().password)
            setRole(auth().role)
        }
    });

    return (
        <div class="bg-white shadow-lg rounded-lg p-6 w-96 ">
            <form>
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" name="name" required value={name()} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2" placeholder="John Doe" />
                </div>
                {/* <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Pasword</label>
                    <input type="password" id="password" name="password" value={password()} required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2" placeholder="john.doe@example.com" />
                </div> */}
                <div class="mb-4">
                    <Show when={auth().role !== "praktikan"}>
                        <label for="se" class="block text-sm font-medium text-gray-700">Role</label>
                        <select id="countries" value={role()} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected={!role()}>Choose a role</option>
                            <option selected={role() === "admin"} value="admin">Admin</option>
                            <option selected={role() === "dosen"} value="dosen">Dosen</option>
                            <option selected={role() === "asisten"} value="asisten">Asisten</option>
                            <option selected={role() === "plts"} value="plts">plts</option>
                            <option selected={role() === "pltb"} value="pltb">pltb</option>
                            <option selected={role() === "pltmh"} value="pltmh">pltmh</option>
                        </select>
                    </Show>
                </div>
                {/* <div class="mb-4">
                    <label for="profile-picture" class="block text-sm font-medium text-gray-700">Profile Picture</label>
                    <input type="file" id="profile-picture" name="profile-picture" class="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2" />
                </div> */}
                <div class="flex items-center justify-between">
                    <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Save Changes</button>
                </div>
            </form>
        </div>
    )
}