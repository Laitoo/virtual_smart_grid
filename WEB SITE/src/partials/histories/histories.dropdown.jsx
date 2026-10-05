
export default function HistoriesDropdown(props) {

    const Item = (props) => {
        return (

            props.url
                ? <a href={props.url} onClick={() => props.callback()} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    {props.label}
                </a>
                : <p onClick={() => props.callback()} class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    {props.label}
                </p>

        )
    }

    return (
        <div class={`absolute z-10 left-120 mt-4 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${props.hidden ? "hidden" : ""}`}>
            <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <Item label={"PV"} url={"/histories/pv"} callback={props.callback} />
                <Item label={"ON GRID"} url={"/histories/ongrid"} callback={props.callback} />
                <Item label={"OFF GRID"} url={"/histories/offgrid"} callback={props.callback} />
                <Item label={"PLTB"} url={"/histories/pltb"} callback={props.callback} />
                <Item label={"PLTMH"} url={"/histories/pltmh"} callback={props.callback} />
            </div>
        </div>
    )
}