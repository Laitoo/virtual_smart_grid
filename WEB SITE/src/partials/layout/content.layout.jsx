import { createSignal, onMount, Show } from "solid-js";
// (Import komponen lain tetap biarkan seperti aslinya)

export default function ContentLayout(props) {
  // 1. Buat sinyal penanda apakah komponen sudah di-mount di browser
  const [isMounted, setIsMounted] = createSignal(false);

  // 2. Set isMounted menjadi true hanya saat di eksekusi di browser
  onMount(() => {
    setIsMounted(true);
    
    // Jika Anda punya logika localStorage (cek token, cek user), 
    // pastikan itu dilakukan di dalam onMount ini atau setelah isMounted true.
  });

  return (
    // 3. Bungkus elemen yang bermasalah dengan <Show> agar
    // Server dan Browser merender hal yang sama di detik pertama.
    <Show when={isMounted()}>
      <div class="min-h-screen w-full px-4 py-2 bg-gray-100">
        {/* Konten layout asli Anda (navbar, sidebar, children) */}
        {props.children}
      </div>
    </Show>
  );
}