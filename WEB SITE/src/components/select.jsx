import { createEffect, createSignal } from "solid-js"

export default function Select(props) {
    const [disable,setDisable] = createSignal(props.disable)
    createEffect(
        () => {
            setDisable(props.disable)
        }
    )
    return(
        <select 
            disabled={disable()}
            onclick={ 
                (event) => {
                    props.callback(event.target.value)
                } 
            } 
            class={`border rounded px-3 py-2 appearance-none focus:outline-none focus:ring-indigo-500 cursor-${ !disable() ? "pointer" : "none" }`}
        >

            {
                props.options.map(
                    option => {
                        return (
                            <option value={option.value}>{option.label}</option>
                        )
                    }
                )
            }

        </select>

    )
}