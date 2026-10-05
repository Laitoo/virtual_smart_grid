import { Index } from "solid-js";
import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
// import Card from "~/components/Card";

const items = [
  {
    title: "PV",
    description: "PV simulation practical",
    extraInfo: `Praktikum PLTS PV (Photovoltaic) dirancang untuk memberikan pemahaman yang mendalam mengenai prinsip kerja modul surya melalui pengujian terhadap kinerja komponen utama, yaitu panel surya dan lampu sorot sebagai sumber cahaya pengganti sinar matahari, serta perangkat pendukung seperti pemanas (heater) dan kipas (fan). Selain itu, praktikum ini juga mengeksplorasi berbagai faktor yang mempengaruhi produksi energi listrik, di antaranya sudut kemiringan panel surya dan tingkat intensitas cahaya dari lampu yang digunakan.
Dalam praktikum ini, mahasiswa akan mempelajari:
- Analisis karakteristik modul surya seperti tegangan, arus, dan daya.
- Penerapan alat ukur untuk menentukan efisiensi sistem PV.
Praktikum ini menjadi dasar penting untuk memahami teknologi energi terbarukan terutama pada pemanfaatan energi surya.`,
    url: "/plts/pv",
    imageUrl: "/plts.jpg",

  },
  {
    title: "Off-Grid",
    description: "Off-Grid simulation practical",
    extraInfo: `Praktikum PLTS Off-Grid berfokus pada sistem tenaga surya yang bekerja secara mandiri tanpa terhubung ke jaringan listrik utama (grid). 
Mahasiswa akan belajar:
- Merancang sistem off-grid, termasuk baterai, inverter, dan pengendali beban.
- Menentukan kebutuhan daya sesuai aplikasi sistem otonom.
- Melakukan pengujian terhadap kinerja sistem dalam berbagai kondisi beban.

Praktikum ini sangat relevan untuk penerapan di daerah terpencil yang tidak terjangkau oleh jaringan listrik konvensional.`,
    url: "/plts/offgrid",
    imageUrl: "/offgrid.jpg",

  },
  {
    title: "On-Grid",
    description: "On-Grid simulation practical",
    extraInfo: `Praktikum PLTS On-Grid mengajarkan bagaimana sistem tenaga surya terintegrasi dengan jaringan listrik utama. 
Dalam praktikum ini, mahasiswa akan mempelajari:
- Prinsip kerja inverter grid-tied yang menyinkronkan daya surya dengan jaringan listrik.
- Perhitungan efisiensi sistem on-grid dan analisis energi yang dikirim ke atau diterima dari jaringan.
- Studi kasus pemasangan dan pengoperasian PLTS untuk keperluan rumah tangga dan industri.

Praktikum ini memberikan wawasan mengenai implementasi energi terbarukan pada skala besar.`,
    url: "/plts/ongrid",
    imageUrl: "/ongrid.jpg",
  },
];

function Card(props) {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = createSignal(false);

  return (
    <div class="relative bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg w-full max-w-mdx">
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
  return (
    <div class="flex flex-wrap gap-6 h-full w-full justify-center px-10 py-6">
      <Index each={items}>
        {(item, index) => (
          <div class="relative p-4">
            <Card
              animation={`animate-in fade-in zoom-in delay-${(delay += 100 * (index + 1))} duration-300`}
              title={item().title}
              description={item().description}
              extraInfo={item().extraInfo}
              imageUrl={item().imageUrl}
              url={item().url}
            />
          </div>
        )}
      </Index>
    </div>
  );
}
