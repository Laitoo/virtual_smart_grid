import { createEffect } from "solid-js";
import ContentOnGrid from "~/partials/plts/ongrid";
import ContentOffgrid from "~/partials/plts/offgrid";

export default function Popup(props) {
  createEffect(() => {
    // Opsional: Tambahkan logika lain saat properti `props.title` berubah
    console.log(props.title);
  });

  return (
    <>
      {/* Overlay untuk menutupi halaman belakang */}
      <div class="fixed inset-0 bg-black bg-opacity-70 z-40"></div>

      {/* Konten popup */}
      <div class="fixed inset-0 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded shadow-lg w-auto">
          <h3 class="text-lg font-bold mb-4">{props.title}</h3>
          {props.title === "Offgrid" ? <ContentOffgrid /> : <ContentOnGrid />}
          <button
            class="bg-red-500 text-white px-4 py-2 rounded"
            onClick={props.onClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
