
export default function SimulasiState(props) {

    return (
        <div class="text-gray-400 font-extralight text-sm">
                { props.state ? "Online" : "Offline" }
        </div>
    )
}