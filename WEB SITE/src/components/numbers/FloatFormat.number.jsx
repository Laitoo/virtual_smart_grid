import { createEffect, createMemo, createSignal } from "solid-js"

export default function FloatFormat(props) {
    // const [value,setValue] = createSignal(0)
    const [leftNumber,setLeftNumber] = createSignal(0)
    const [rightNumber,setRightNumber] = createSignal(0)

    createEffect(
        () => {
            if ( props.value && typeof props.value !== `undefined` ) { 
                // alert(typeof props.value )
                const splitNumber =  typeof props.value === `string` ? props.value.split(".") : props.value.toFixed(2).split(".");
                setLeftNumber(splitNumber[0] ? splitNumber[0] : 0 )
                setRightNumber(splitNumber[1] ? splitNumber[1] : 0 )
            };
        }
    )

    return (
        <p class={` ${props.cls && props.cls[0] ? props.cls[0] : "text-semibold text-4xl"}`}>
            {leftNumber()}.<span class={` ${props.cls && props.cls[1] ? props.cls[1] : "text-semibold text-2xl" }`}>{rightNumber()}</span>
        </p>
    )
}