import { createSignal } from "solid-js";
import { PV_TAG } from "~/json/pv-tag-json";

function LightControl(props) {
  const [modalOpen, setModalOpen] = createSignal(false);
  const [inputValue, setInputValue] = createSignal(props.value || 0);
  const [error, setError] = createSignal("");

  const onSliderChange = (e) => {
    const val = Number(e.target.value);
    setInputValue(val);
    setError("");
    props.callback(PV_TAG.command.dimmer,val);
  };

  const onModalInputChange = (val) => {
    if (val === "") {
      setInputValue("");
      setError("");
      return;
    }
    const num = Number(val);
    if (isNaN(num) || num < 0 || num > 100) {
      setError("Nilai harus antara 0 dan 100");
    } else {
      setError("");
      setInputValue(num);
    }
  };

  const handleNumberClick = (num) => {
    let newVal = inputValue().toString() + num.toString();
    if (newVal.length > 3) return;
    let n = Number(newVal);
    if (n > 100) {
      setError("Nilai maksimal adalah 100");
      return;
    }
    setError("");
    setInputValue(n);
  };

  const handleBackspace = () => {
    const valStr = inputValue().toString();
    const newVal = valStr.length <= 1 ? "" : valStr.slice(0, -1);
    setInputValue(newVal === "" ? "" : Number(newVal));
    setError("");
  };

  const handleSubmit = () => {
    if (inputValue() === "" || inputValue() < 0 || inputValue() > 100) {
      setError("Nilai harus antara 0 dan 100");
      return;
    }
    props.callback(PV_TAG.command.dimmer,inputValue());
    setModalOpen(false);
  };

  const handleTrigger = () => {
    if (inputValue() >= 1 && inputValue() <= 100) {
      console.log("🔘 Triggered at value:", inputValue());
      props.callback(PV_TAG.command.button,"1");
      const myInterval = setInterval(() => {
        props.callback(PV_TAG.command.button,"0");
        clearInterval(myInterval)
      }, 2000); // Reset after 1 second
    }
  };

  return (
    <div class="flex flex-col items-center justify-center bg-gray-200 p-6 rounded-lg w-[280px] h-[200px] shadow-lg relative">
      <h1 class="text-lg font-bold text-gray-800 mb-4">Light Intensity (lux)</h1>

      {/* Slider */}
      <div class="flex items-center w-full px-4 space-x-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9..." />
        </svg>

        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={inputValue()}
          onInput={onSliderChange}
          class="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-gray-600"
        />

        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9..." />
        </svg>
      </div>

      {/* Nilai */}
      <p
        class="text-2xl font-bold text-gray-800 mt-4 cursor-pointer select-none 
               hover:text-blue-600 active:text-blue-800 transition-colors duration-200"
        onClick={() => setModalOpen(true)}
        title="Klik untuk membuka kalkulator"
      >
        {inputValue() === "" ? "0" : inputValue()}
      </p>

      {/* Trigger Button with Image Icon */}
      <button
        onClick={handleTrigger}
        class={`absolute bottom-3 right-3 w-8 h-8 rounded-full shadow-md border-2 
                flex items-center justify-center transition-all duration-200
                ${inputValue() >= 1 && inputValue() <= 100 ? "bg-white hover:scale-110 cursor-pointer" : "bg-gray-200 cursor-pointer"}`}
        disabled={!(inputValue() >= 1 && inputValue() <= 100)}
        title="Trigger Lampu"
      >
        <img
          src="/power-button-icon-8344.png"
          alt="Trigger"
          class="w-6 h-6"
          draggable={false}
        />
      </button>

      {/* Modal Kalkulator */}
      {modalOpen() && (
        <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 w-[320px] shadow-lg relative">
            <button
              class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
              onClick={() => setModalOpen(false)}
              aria-label="Tutup"
            >
              &times;
            </button>

            <h2 class="text-xl font-bold mb-4 text-center">Input Light Intensity (0-100)</h2>

            <input
              type="text"
              value={inputValue()}
              onInput={(e) => onModalInputChange(e.target.value)}
              class="w-full text-2xl font-mono p-2 mb-3 border border-gray-300 rounded text-center"
              maxLength={3}
              placeholder="Masukkan nilai"
            />

            {error() && (
              <p class="text-red-600 mb-3 font-semibold text-center">{error()}</p>
            )}

            <div class="grid grid-cols-4 gap-3">
              {[7, 8, 9, "⌫", 4, 5, 6, "OK", 1, 2, 3, 0].map((item) => {
                if (item === "⌫")
                  return (
                    <button key="backspace" class="bg-gray-200 py-3 rounded shadow hover:bg-gray-300 font-bold text-lg" onClick={handleBackspace}>
                      ⌫
                    </button>
                  );
                if (item === "OK")
                  return (
                    <button key="submit" class="bg-blue-600 text-white py-3 rounded shadow hover:bg-blue-700 font-bold" onClick={handleSubmit}>
                      OK
                    </button>
                  );
                return (
                  <button key={item} class="bg-gray-200 py-3 rounded shadow hover:bg-gray-300 font-bold text-lg" onClick={() => handleNumberClick(item)}>
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LightControl;
