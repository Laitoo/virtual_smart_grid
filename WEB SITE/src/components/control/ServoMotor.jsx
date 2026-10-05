import { createSignal } from "solid-js";

export default function ServoMotor(props) {
  const [angle, setAngle] = createSignal(90); // Sudut awal 90 derajat

  return (
    <div class="flex flex-col justify-center items-center bg-gray-200 p-4 rounded-lg w-[280px] h-[230px] shadow-lg">
      <h1 class="text-xl font-bold text-black-600 mb-4">Servo Motor Control</h1>
      <div class="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
        <p class="text-lg text-gray-700 mb-4">Sudut: {props.value}°</p>
        <div class="flex space-x-4">
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={ () => props.callback(1,0)}
          >
            Turun (-)
          </button>
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => props.callback(0,1) }
          >
            Naik (+)
          </button>
        </div>
      </div>
    </div>
  );
}