import { createSignal, onMount } from "solid-js";

export default function BatteryIndicator() {
  const [batteryLevel, setBatteryLevel] = createSignal(10);

  // Simulasi pembaruan level baterai secara dinamis
  onMount(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => (prev < 100 ? prev + 10 : 0)); // Loop dari 0 ke 100
    }, 2000); // Perbarui setiap 2 detik
    return () => clearInterval(interval);
  });

  return (
    <div class="flex flex-col items-center justify-center bg-gray-200 rounded shadow-md w-80 h-40">
      {/* Teks Battery Condition */}
      <div class="text-l font-bold text-gray-800 text-center mb-1">
        Battery Condition
      </div>
      {/* Bentuk Baterai */}
      <div class="relative flex items-center w-60 h-40 bg-gray-300 border-4 border-black rounded-sm">
        {/* Indikator Level Baterai */}
        <div
          class="h-full bg-green-500 transition-all duration-300"
          style={{
            width: `${batteryLevel()}%`, // Indikator bergerak sesuai persentase
          }}
        ></div>
        {/* Kepala Baterai */}
        <div class="absolute -right-5 w-4 h-10 bg-black"></div>
      </div>
      {/* Persentase Baterai */}
      <div class="text-xl font-bold text-gray-900 mt-2">{batteryLevel()}%</div>
    </div>
  );
}
