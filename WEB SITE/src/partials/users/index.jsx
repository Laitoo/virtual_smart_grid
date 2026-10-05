import { onMount } from "solid-js";
import { UseAuthCtx } from "~/context/auth.context";
import { UseDataCtx } from "~/context/data.context"

export default function ContentUsers(props) {

    const { auth } = UseAuthCtx();
    const { users, togglePassword, findAllUser } = UseDataCtx();

    onMount(
        () => {
            findAllUser(auth().token);
        }
    )

    return (
        <div class="p-4 h-screen">
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                User name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Password
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users() && users().map(
                                user => {
                                    return (
                                        <tr id={user.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {user.name} 
                                            </th>
                                            <td class="px-6 py-4">
                                                {user.role}
                                            </td>
                                            <td class="px-6 py-4">
                                                <div class="relative mt-6">
                                                    <input
                                                        type={ user.showPassword ? "text" : "password"}
                                                        id={`${user.id}-password`}
                                                        value={user.password}
                                                        onInput={(e) => setPassword(e.target.value)}
                                                        placeholder=" "
                                                        class="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 transition duration-200"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        onclick={ () => togglePassword(user.id) }
                                                        class="absolute right-4 top-2 text-gray-500 focus:outline-none"
                                                    >
                                                        {user.showPassword ? "Hide" : "Show"}
                                                    </button>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4">
                                                <div class="flex flex-row gap-2">
                                                    <button class="">Edit</button>
                                                    <button class="">Hapus</button>
                                                </div>
                                            </td>
                                        </tr>

                                    )
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}