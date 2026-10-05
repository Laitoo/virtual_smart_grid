import { createSignal, createMemo, onMount, onCleanup } from "solid-js";
import GeneratorMonitorCard from "../components/GeneratorMonitorCard";
// Pastikan path GrafikTrent sesuai dengan lokasi di proyek Anda
import GrafikTrent from "../components/chart/GrafikTrent"; 

export default function SmartGridMonitoring() {
  // 1. State Kartu Input (V, I, P)
  const [plts, setPlts] = createSignal({ v: null, i: null, p: null });
  const [pltb, setPltb] = createSignal({ v: null, i: null, p: null });
  const [pltmh, setPltmh] = createSignal({ v: null, i: null, p: null });

  // 2. State Target Output (Slider)
  const [targetOutput, setTargetOutput] = createSignal(12.0);

  // 3. State Grafik Tren (Memisahkan Array V, I, dan P)
  const [activeMetric, setActiveMetric] = createSignal("V"); // Tab aktif: 'V', 'I', atau 'P'
  
  const [seriesV, setSeriesV] = createSignal([
    { name: "PLTS (Surya)", data: [] }, { name: "PLTB (Angin)", data: [] }, { name: "PLTMH (Air)", data: [] }
  ]);
  const [seriesI, setSeriesI] = createSignal([
    { name: "PLTS (Surya)", data: [] }, { name: "PLTB (Angin)", data: [] }, { name: "PLTMH (Air)", data: [] }
  ]);
  const [seriesP, setSeriesP] = createSignal([
    { name: "PLTS (Surya)", data: [] }, { name: "PLTB (Angin)", data: [] }, { name: "PLTMH (Air)", data: [] }
  ]);

  onMount(() => {
    // --- INTERVAL 1: KARTU MONITORING (Update Cepat per 2 Detik) ---
    const cardInterval = setInterval(() => {
      // Menghasilkan data acak yang logis
      const v1 = 15.0 + Math.random() * 5;  const i1 = 1.0 + Math.random() * 2;   const p1 = v1 * i1;
      const v2 = 8.0 + Math.random() * 10;  const i2 = 0.5 + Math.random() * 1.5; const p2 = v2 * i2;
      const v3 = 12.0 + Math.random() * 2;  const i3 = 2.0 + Math.random() * 1;   const p3 = v3 * i3;

      // Update Angka di Kartu
      setPlts({ v: v1, i: i1, p: p1 });
      setPltb({ v: v2, i: i2, p: p2 });
      setPltmh({ v: v3, i: i3, p: p3 });
    }, 2000);

    // --- INTERVAL 2: GRAFIK TREN (Update Lambat per 5 Detik) ---
    const chartInterval = setInterval(() => {
      const now = new Date().getTime(); // Waktu saat ini (X-axis)
      const maxPoints = 20; // Menampilkan 20 titik riwayat terakhir (100 detik ke belakang)

      // Mengambil nilai terbaru dari state kartu yang sedang berjalan
      const curPlts = plts();
      const curPltb = pltb();
      const curPltmh = pltmh();

      // Memastikan data kartu sudah ada sebelum menggambar grafik
      if (curPlts.v !== null) {
        setSeriesV(prev => [
          { name: "PLTS (Surya)", data: [...prev[0].data, [now, curPlts.v]].slice(-maxPoints) },
          { name: "PLTB (Angin)", data: [...prev[1].data, [now, curPltb.v]].slice(-maxPoints) },
          { name: "PLTMH (Air)", data: [...prev[2].data, [now, curPltmh.v]].slice(-maxPoints) }
        ]);
        
        setSeriesI(prev => [
          { name: "PLTS (Surya)", data: [...prev[0].data, [now, curPlts.i]].slice(-maxPoints) },
          { name: "PLTB (Angin)", data: [...prev[1].data, [now, curPltb.i]].slice(-maxPoints) },
          { name: "PLTMH (Air)", data: [...prev[2].data, [now, curPltmh.i]].slice(-maxPoints) }
        ]);

        setSeriesP(prev => [
          { name: "PLTS (Surya)", data: [...prev[0].data, [now, curPlts.p]].slice(-maxPoints) },
          { name: "PLTB (Angin)", data: [...prev[1].data, [now, curPltb.p]].slice(-maxPoints) },
          { name: "PLTMH (Air)", data: [...prev[2].data, [now, curPltmh.p]].slice(-maxPoints) }
        ]);
      }
    }, 5000);

    // Membersihkan kedua interval saat komponen ditutup
    onCleanup(() => {
      clearInterval(cardInterval);
      clearInterval(chartInterval);
    });
  });

  // 4. Konfigurasi Grafik Dinamis
  const currentChartData = createMemo(() => {
    if (activeMetric() === "V") return seriesV();
    if (activeMetric() === "I") return seriesI();
    return seriesP();
  });

  const chartOptions = createMemo(() => {
    let yTitle = "Tegangan (Volt)";
    let yUnit = " V";
    if (activeMetric() === "I") { yTitle = "Arus (Ampere)"; yUnit = " A"; }
    if (activeMetric() === "P") { yTitle = "Daya (Watt)"; yUnit = " W"; }

    return {
      colors: ['#EAB308', '#3B82F6', '#22C55E'],
      stroke: { width: 3, curve: 'smooth' },
      xaxis: {
        type: 'datetime',
        labels: { datetimeUTC: false, format: 'HH:mm:ss' }
      },
      yaxis: {
        title: { text: yTitle, style: { fontWeight: 600 } },
        labels: { formatter: (value) => value ? value.toFixed(1) : "0" }
      },
      tooltip: {
        x: { format: 'HH:mm:ss' },
        y: { formatter: (value) => value ? value.toFixed(2) + yUnit : "" }
      },
      dataLabels: { enabled: false },
      legend: { position: 'top', horizontalAlign: 'right' }
    };
  });

  return (
    <div class="p-6 min-h-screen bg-gray-50">
      
      <div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-800">Smart Grid Center</h1>
          <p class="text-gray-500 mt-1">Pemantauan Parameter Input & Pengendalian Output Terpusat</p>
        </div>
      </div>

      {/* SECTION 1: KARTU MONITORING INPUT */}
      <h2 class="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span>⚡</span> Parameter Input Pembangkit (Raw Data)
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <GeneratorMonitorCard title="PLTS (Surya)" icon="☀️" data={plts()} themeColor="border-yellow-400" textColor="text-yellow-800" />
        <GeneratorMonitorCard title="PLTB (Angin)" icon="💨" data={pltb()} themeColor="border-blue-400" textColor="text-blue-800" />
        <GeneratorMonitorCard title="PLTMH (Air)" icon="💧" data={pltmh()} themeColor="border-green-500" textColor="text-green-800" />
      </div>

      {/* SECTION 2: SLIDER TARGET OUTPUT */}
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-indigo-600 mb-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div class="flex-1">
            <h2 class="text-xl font-bold text-gray-800">Regulasi Tegangan Output Grid</h2>
            <p class="text-sm text-gray-500 mb-4">Atur batas tegangan sistem (Buck-Boost setpoint). Rentang: 5V - 24V DC.</p>
            <div class="flex items-center gap-4">
              <span class="text-sm font-bold text-gray-400">5V</span>
              <input 
                type="range" min="5" max="24" step="0.1" 
                value={targetOutput()} 
                onInput={(e) => setTargetOutput(parseFloat(e.target.value))}
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <span class="text-sm font-bold text-gray-400">24V</span>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center bg-indigo-50 px-8 py-4 rounded-xl border border-indigo-100 min-w-[200px]">
            <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Target Output</span>
            <div class="flex items-baseline gap-1 text-indigo-700">
              <span class="text-5xl font-black">{targetOutput().toFixed(1)}</span>
              <span class="text-xl font-bold">V</span>
            </div>
            <button class="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors shadow-sm">
              Kirim Perintah
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 3: GRAFIK TREN DENGAN TAB */}
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-gray-100 pb-4">
          <div>
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2"><span>📈</span> Analisis Tren Parameter</h2>
            <p class="text-sm text-gray-500 mt-1">Pantau fluktuasi historis dari sumber energi secara terpusat.</p>
          </div>
          
          {/* Tombol Tab Navigasi Grafik */}
          <div class="flex bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setActiveMetric("V")}
              class={`px-4 py-2 text-sm font-bold rounded-md transition-all ${activeMetric() === "V" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Tegangan (V)
            </button>
            <button 
              onClick={() => setActiveMetric("I")}
              class={`px-4 py-2 text-sm font-bold rounded-md transition-all ${activeMetric() === "I" ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Arus (A)
            </button>
            <button 
              onClick={() => setActiveMetric("P")}
              class={`px-4 py-2 text-sm font-bold rounded-md transition-all ${activeMetric() === "P" ? "bg-white text-green-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Daya (W)
            </button>
          </div>
        </div>
        
        {/* Trik Force Re-render: Memaksa grafik dirender ulang sepenuhnya saat tab berubah agar label Sumbu Y tidak tersangkut */}
        {activeMetric() === "V" && <GrafikTrent series={currentChartData()} options={chartOptions()} type="line" height={380} />}
        {activeMetric() === "I" && <GrafikTrent series={currentChartData()} options={chartOptions()} type="line" height={380} />}
        {activeMetric() === "P" && <GrafikTrent series={currentChartData()} options={chartOptions()} type="line" height={380} />}
      </div>

    </div>
  );
}