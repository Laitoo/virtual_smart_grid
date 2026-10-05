import { createSignal, createEffect, onMount } from "solid-js";
import FloatFormat from "../numbers/FloatFormat.number";

const Gauge = (props) => {

  const [value, setValue] = createSignal(0.0);

  createEffect(
    () => {
      setValue(props.value)
      // if (props.label === "Wind Speed" ) console.log(props.value, value())
    }
  )

  return (
    <div class="flex flex-col justify-center item-center bg-gray-200 p-4 rounded-lg w-[180px] h-[180px] shadow-lg">
      <h1 class="text-center text-m font-bold text-gray-800 mb-4">{props.label || "Default Label"}</h1>
      <div class="flex justify-center items-center h-screen">
        <div class="relative w-24 h-24">
          <svg
            viewBox="0 0 100 100"
            class="absolute w-full h-full transform rotate-[-90deg]"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="gray"
              stroke-width="10"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={props.color}
              stroke-width="10"
              fill="none"
              stroke-dasharray="282"
              stroke-dashoffset={`${282 - (parseInt(value()) / 100) * 282}`}
              stroke-linecap="round"
            />
          </svg>
          <div class="absolute inset-0 flex flex-col justify-center items-center">
            <span class="text-lg font-bold">
              <FloatFormat value={value()} cls={["font-bold text-normal", "font-light text-xs"]} />
            </span>
            <span class="text-m font-bold">{props.role}</span>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Gauge;