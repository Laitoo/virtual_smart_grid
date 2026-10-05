import { createSignal, onCleanup, onMount } from "solid-js";

export default function EnergyPractikumPage() {

  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [isPaused, setIsPaused] = createSignal(false);
  let timeoutId; // Untuk melanjutkan slideshow setelah 3,5 detik tanpa interaksi

  const slides = [
    {
      title: "Selamat datang di Praktikum Energi Baru Terbarukan!",
      description:
        "Praktikum ini dirancang untuk memberikan pengalaman langsung dan mendalam tentang teknologi pembangkit listrik berbasis energi baru terbarukan, yang menjadi solusi masa depan untuk kebutuhan energi berkelanjutan. Dalam laboratorium kami yang canggih, Anda akan mengeksplorasi, menganalisis, dan mengoperasikan tiga jenis pembangkit listrik utama: Pembangkit Listrik Tenaga Surya (PLTS), Pembangkit Listrik Tenaga Bayu (PLTB), dan Pembangkit Listrik Tenaga Mikrohidro (PLTMH).",
    },
    {
      title: "Fitur Unggulan Praktikum",
      description:
        "Praktikum ini memberikan pengalaman komprehensif pada tiga jenis pembangkit listrik berbasis energi baru terbarukan, yaitu PLTS, PLTB, dan PLTMH, yang dirancang untuk melatih mahasiswa memahami teknologi dan penerapan sistem energi berkelanjutan. Pada PLTS, mahasiswa akan mempelajari teknologi Photovoltaic (PV) untuk memahami konversi energi menjadi listrik, menguasai sistem On-Grid untuk integrasi dengan jaringan utama serta pengelolaan surplus daya, dan mendalami sistem Off-Grid yang memungkinkan pengelolaan energi mandiri menggunakan baterai.",
    },
    {
      title: "Tujuan Utama Praktikum",
      description:
        "Tujuan utama dari praktikum ini adalah untuk membekali mahasiswa dengan keterampilan praktis dan pemahaman mendalam mengenai perancangan, pengoperasian, dan pengelolaan sistem pembangkit listrik berbasis energi baru terbarukan, seperti PLTS, PLTB, dan PLTMH, sehingga mereka mampu memahami prinsip kerja, efisiensi, serta tantangan teknis yang terkait.",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((currentIndex() + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex() - 1 + slides.length) % slides.length);
  };

  // Auto slide logic
  let intervalId;

  const startAutoSlide = () => {
    intervalId = setInterval(() => {
      if (!isPaused()) {
        nextSlide();
      }
    }, 1500); // 1,5 detik per slide
  };

  const stopAutoSlide = () => {
    setIsPaused(true);
    clearTimeout(timeoutId); // Hapus timeout jika ada
    clearInterval(intervalId); // Hentikan slideshow otomatis
  };

  const resumeAutoSlideAfterDelay = () => {
    timeoutId = setTimeout(() => {
      setIsPaused(false); // Lanjutkan slideshow
      startAutoSlide(); // Mulai ulang auto-slide
    }, 3500); // Lanjutkan slideshow setelah 3,5 detik
  };

  onMount(() => {
    startAutoSlide();
  });

  onCleanup(() => {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
  });

  return (
    <div class="relative h-screen w-full bg-gray-800">
      {/* Background Image */}
      <img
        src="/update.jpg"
        alt="Background"
        class="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div
        class="relative z-10 flex flex-col items-center justify-center h-full text-white px-4"
        onMouseEnter={stopAutoSlide}
        onMouseLeave={resumeAutoSlideAfterDelay}
        onClick={() => {
          stopAutoSlide();
          resumeAutoSlideAfterDelay();
        }}
      >
        {/* Slide Content */}
        <div class="text-center max-w-3xl">
          <h1 class="text-3xl md:text-4xl font-extralight mb-4">
            {slides[currentIndex()].title}
          </h1>
          <p class="text-lg md:text-xl font-light leading-relaxed">
            {slides[currentIndex()].description}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div class="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-8">
          <button
            class="p-2 bg-gray-700 hover:bg-gray-600 rounded-full"
            onClick={prevSlide}
          >
            ❮
          </button>
          <button
            class="p-2 bg-gray-700 hover:bg-gray-600 rounded-full"
            onClick={nextSlide}
          >
            ❯
          </button>
        </div>

        {/* Slide Indicators */}
        <div class="mt-4 flex space-x-2">
          {slides.map((_, index) => (
            <span
              class={`h-3 w-3 rounded-full ${currentIndex() === index ? "bg-white" : "bg-gray-500"
                }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
