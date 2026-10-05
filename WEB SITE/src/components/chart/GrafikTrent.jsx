import { onMount, onCleanup, createEffect } from "solid-js";

export default function GrafikTrent(props) {
  let chartRef;
  let chart;

  onMount(async () => {
    // 1. Dynamic Import: Memastikan ApexCharts hanya dieksekusi oleh browser (Client-Side)
    // Ini mencegah error "window is not defined" pada saat Server-Side Rendering (SSR)
    const module = await import("apexcharts");
    const ApexCharts = module.default;

    // 2. Konfigurasi dasar grafik
    const options = {
      chart: {
        type: props.type || 'line',
        height: props.height || 350,
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000 // Animasi transisi yang mulus untuk data real-time
          }
        },
        toolbar: {
          show: false // Menyembunyikan menu bawaan agar tampilan lebih bersih
        },
        zoom: {
          enabled: false
        }
      },
      series: props.series || [],
      stroke: {
        curve: 'smooth',
        width: 3
      },
      xaxis: props.xaxis || {
        type: 'datetime',
      },
      yaxis: props.yaxis || {
        title: {
          text: 'Nilai'
        }
      },
      ...props.options // Mengizinkan kustomisasi tambahan dari halaman yang memanggil komponen ini
    };

    // 3. Render grafik ke dalam elemen div
    chart = new ApexCharts(chartRef, options);
    chart.render();
  });

  // 4. Update data secara real-time
  // Fungsi ini akan otomatis terpanggil jika nilai props.series berubah (misal saat ada data baru dari socket/MQTT)
  createEffect(() => {
    if (chart && props.series) {
      chart.updateSeries(props.series);
    }
  });

  // 5. Mencegah kebocoran memori (Memory Leak)
  // Menghancurkan instance grafik jika pengguna berpindah ke halaman/menu lain
  onCleanup(() => {
    if (chart) {
      chart.destroy();
    }
  });

  return (
    <div class="w-full">
      {/* Target render untuk ApexCharts */}
      <div ref={chartRef}></div>
    </div>
  );
}