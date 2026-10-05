import { createEffect, createSignal } from "solid-js"

export default function InputDate(props) {
    const [data, setData] = createSignal(props.data)

    createEffect(
        () => {
            setData(props.data)
        }
    )

    return (
        <div class="w-fit">
            <input
                type="date"
                value={data()}
                onChange={(e) => { props.callback(e.target.value) }}
                class="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    )

}