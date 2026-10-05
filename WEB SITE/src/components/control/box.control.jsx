export default function BoxControl(props) {
    return (
        <div class="flex flex-col justify-center items-center w-auto gap-y-4 border-2 rounded-md p-2  ">
            {props.children}
        </div>
    )
}