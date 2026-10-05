import { Index, Show } from "solid-js";
import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { UseAuthCtx } from "~/context/auth.context";

const items = [
  {
    title: "PLTS",
    role: "plts",
    description: "Solar Panel simulation practical",
    extraInfo: `Praktikum Pembangkit Listrik Tenaga Surya (PLTS) ini dirancang untuk memberikan pemahaman mendalam mengenai teknologi energi terbarukan, khususnya tenaga surya.
Dalam praktikum ini, mahasiswa akan mempelajari:
1. Komponen utama PLTS seperti panel surya, inverter, baterai, dan pengontrol daya.
2. Prinsip kerja PLTS, mulai dari konversi energi matahari menjadi listrik hingga distribusi ke beban.
3. Perancangan sistem PLTS, perhitungan kebutuhan energi, efisiensi sistem, dan konfigurasi panel.
4. Simulasi dan implementasi sistem PLTS skala kecil.
Dengan memahami teknologi ini, mahasiswa diharapkan dapat mendukung transisi energi bersih di masa depan.`,
    url: "/plts",
    imageUrl: "/plts.jpg",
  },
  {
    title: "PLTB",
    role: "pltb",
    description: "Wind Turbine simulation practical",
    extraInfo: `Praktikum PLTB (Pembangkit Listrik Tenaga Bayu) adalah kegiatan pembelajaran praktis untuk memahami prinsip kerja, komponen, dan teknologi yang digunakan dalam pembangkit listrik berbasis energi angin.
Mahasiswa akan mempelajari:
1. Konsep konversi energi angin menjadi energi listrik.
2. Pengoperasian berbagai jenis turbin angin dan sistem PLTB skala kecil.
3. Pengukuran kecepatan angin, daya listrik yang dihasilkan, dan analisis kinerja sistem.
4. Penerapan energi terbarukan dan dampaknya terhadap keberlanjutan lingkungan.
Melalui praktikum ini, mahasiswa tidak hanya belajar teori tetapi juga mendapat pengalaman langsung yang dapat diaplikasikan di dunia nyata.`,
    url: "/pltb",
    imageUrl: "/pltb.jpg",
  },
  {
    title: "PLTMH",
    role: "pltmh",
    description: "Micro Hydro simulation practical",
    extraInfo: `Praktikum Pembangkit Listrik Tenaga Mikro Hidro (PLTMH) berfokus pada prinsip kerja, perancangan, instalasi, dan pengoperasian sistem PLTMH.
Dalam praktikum ini, mahasiswa akan mempelajari:
1. Observasi dan analisis lokasi untuk pembangkit mikro hidro.
2. Perancangan sistem PLTMH, termasuk perhitungan daya dan pemilihan turbin.
3. Simulasi atau instalasi sistem PLTMH skala kecil.
4. Evaluasi efisiensi dan kinerja sistem, serta solusi untuk permasalahan teknis.
Melalui praktikum ini, mahasiswa akan mendapatkan wawasan akademik dan keterampilan teknis dalam energi terbarukan.`,
    url: "/pltmh",
    imageUrl: "/pltmh.jpg",
  },
];

function Card(props) {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = createSignal(false);

  return (
    <div class="relative bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg w-full max-w-md">
      {/* Gambar Card */}
      <div class="relative">
        <img src={props.imageUrl} alt={props.title} class="object-cover w-full h-40 opacity-70" />

        {/* Tanda seru (!), klik untuk menampilkan informasi */}
        <button
          class="absolute top-2 right-2 bg-black text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
          onClick={() => setShowInfo(!showInfo())}
        >
          {/* <p>{showInfo()? "show" : "hide"}</p> */}
          !
        </button>
      </div>

      {/* Konten Utama */}
      <div class="p-4">
        <h2 class="text-xl font-bold">{props.title}</h2>
        <p>{props.description}</p>
        <button
          onClick={() => navigate(props.url)}
          class="mt-2 px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Click here
        </button>
      </div>

      {/* Informasi Tambahan */}
      {showInfo() && (
        <div class="p-4 bg-gray-100 text-sm text-gray-900 mt-2 rounded whitespace-pre-line">
          {props.extraInfo}
        </div>
      )}
    </div>
  );
}

export default function ContentDashboard() {
  let delay = 0;
  const { auth } = UseAuthCtx();
  return (
    <div class="flex flex-wrap gap-6 h-full w-full justify-center px-10 py-6">
      {/* <div class="grid grid-cols-1 md:grid-cols-3 gap-6 h-full w-full justify-center px-10 py-6"> */}
      <Index each={items}>
        {(item, index) => (
          <Show when={auth() && auth().role && (item().role === auth().role) || ["root", "admin", "dosen", "asisten"].findIndex(role => role === auth().role) > 0}>
            <div class="relative p-4">
              <Card
                animation={`animate-in fade-in zoom-in delay-${(delay += 100 * (index + 1))} duration-300`}
                title={item().title }
                description={item().description}
                extraInfo={item().extraInfo}
                imageUrl={item().imageUrl}
                url={item().url}
              />
            </div>
          </Show>
        )}
      </Index>
    </div>
  );
}
