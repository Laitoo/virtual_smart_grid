
export default function Radios(props) {

    const Radio = (props) => {
        return (
            <div class={`flex flex-row ${props.flex !== "col" ? "justify-center items-center" : ""} w-full h-full`}>
                <input
                    id={`radio-${props.id}`} type="radio"
                    onclick={ () => props.callback(props.value) }
                    value={props.value}
                    name={`default-radio`}
                    checked={props.checked}
                    class={`cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`} />
                <label for={`default-radio-${props.id}`} class="ms-2 text-sm font-light text-gray-900 dark:text-gray-300">
                    {props.label}
                </label>
            </div>
        )
    }
    return (
        <div class="font-extralight text-gray-400 text-xs border p-2">
            <h1 class="font-medium">{props.title}</h1>
            <form action="">
                <div class={`flex flex-${props.flex ? props.flex : "row"} ${props.flex !== "col" ? "items-center justify-center h-full p-2 gap-4" : ""} border`}>
                    {
                        props.items.map(
                            (item, idx) => {
                                return (
                                    <Radio id={idx} 
                                        flex={props.flex} 
                                        label={item.label} 
                                        value={item.value} 
                                        checked={ props.value === item.value }
                                        callback={props.callback} 
                                    />
                                )
                            }
                        )
                    }
                </div>
            </form>
        </div>
    )
}
