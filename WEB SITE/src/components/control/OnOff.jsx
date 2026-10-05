import { createSignal } from "solid-js";

function ToggleSwitch(props) {

  const [isOn, setIsOn] = createSignal(props.value);

  const handleClick = (event) => {
    setIsOn(!props.value)
    if (props.callback) props.callback(isOn())
  }

  return (
    <div class="flex flex-col items-center justify-center bg-gray-200 p-4 rounded-lg w-[140px] h-[95px] shadow-lg">
      <div class="flex flex-col items-center">
        {/* Text Header */}
        <span class="text-m font-bold text-gray-800 mb-4">{props.label || "Default Label"}</span>
        {/* Toggle Container */}
        <div 
          class={`w-20 h-10 flex items-center rounded-full p-1 cursor-pointer transition-colors ${ Number(props.value) > 0 ? "bg-green-500" : "bg-red-500"}`}
          onclick={ handleClick }
        >
          {/* Toggle Button */}
          <div class={`h-8 w-8 bg-white rounded-full shadow-md transform transition-transform ${ Number(props.value) > 0 ? "translate-x-10" : "translate-x-0"}`}
          ></div>
        </div>
      </div>

    </div>
  );
}

export default ToggleSwitch;
