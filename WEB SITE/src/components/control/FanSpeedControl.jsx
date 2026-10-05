import { createSignal } from "solid-js";

function FanSpeedControl(props) {
  const [showModal, setShowModal] = createSignal(false);
  const [input, setInput] = createSignal(props.value ? String(props.value) : "0");
  const [error, setError] = createSignal("");

  // Handle tombol panah (dec, inc)
  const handleArrowClick = (dec, inc) => {
    if (props.callback) props.callback(dec, inc);
  };

  // Saat klik angka di modal
  const handleNumberClick = (num) => {
    let newInput = input() === "0" ? String(num) : input() + num;
    // Cek jika nilai baru melebihi 10
    const valNum = Number(newInput);
    if (valNum > 10) {
      setError("Nilai tidak boleh lebih dari 10");
      return;
    }
    if (newInput.length > 2) return; // maksimal 2 digit
    setInput(newInput);
    setError("");
  };

  // Hapus angka terakhir
  const handleBackspace = () => {
    if (input().length <= 1) {
      setInput("0");
    } else {
      setInput(input().slice(0, -1));
    }
    setError("");
  };

  // Submit nilai manual dari modal
  const handleSubmit = () => {
    const val = Number(input());
    if (isNaN(val) || val < 0 || val > 10) {
      setError("Nilai harus antara 0 dan 10");
      return;
    }
    if (props.callbackManual) {
      props.callbackManual(val);
    }
    setShowModal(false);
  };

  return (
    <div class="flex flex-col items-center justify-center bg-gray-200 p-4 rounded-lg w-[256px] h-[150px] shadow-lg relative">
      <h1 class="text-m font-bold text-gray-800 mb-4">{props.label || "FAN SPEED LEVEL"}</h1>

      <div class="flex items-center space-x-6">
        {/* Tombol panah kiri */}
        <button
          onClick={() => handleArrowClick(1, 0)}
          class="bg-black text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl"
        >
          &#8592;
        </button>
        {/* Tombol panah kanan */}
        <button
          onClick={() => handleArrowClick(0, 1)}
          class="bg-black text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl"
        >
          &#8594;
        </button>
      </div>

      {/* Angka kecepatan, klik untuk buka modal */}
      <p
        class="text-3xl font-light text-gray-800 mt-3 cursor-pointer hover:text-blue-600"
        onClick={() => setShowModal(true)}
        title="Klik untuk input manual"
      >
        {props.value ?? 0}
      </p>
      <p class="w-full text-right text-xs font-bold text-gray-600">{props.description}</p>

      {/* Modal kalkulator */}
      {showModal() && (
        <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 w-64 shadow-lg relative">
            <button
              class="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowModal(false)}
              aria-label="Tutup modal"
            >
              &#x2715;
            </button>
            <h2 class="text-lg font-bold mb-4">Input Fan Speed (0–10)</h2>

            <input
              type="text"
              class="w-full text-center border rounded py-2 mb-4 text-xl"
              value={input()}
              readOnly
            />

            {error() && <p class="text-red-600 mb-2">{error()}</p>}

            <div class="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                <button
                  class="bg-gray-200 py-2 rounded hover:bg-gray-300 font-semibold"
                  onClick={() => handleNumberClick(num)}
                  key={num}
                >
                  {num}
                </button>
              ))}
              <button
                class="col-span-2 bg-blue-600 text-white rounded py-2 hover:bg-blue-700 font-semibold"
                onClick={handleSubmit}
              >
                OK
              </button>
              <button
                class="bg-red-300 rounded py-2 hover:bg-red-400 font-semibold"
                onClick={handleBackspace}
              >
                ⌫
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FanSpeedControl;
