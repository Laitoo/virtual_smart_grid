import HomeContent from "~/partials/home";

const index = () => {
  return (
    <div class="relative  w-full bg-gray-800">
      {/* Background Image */}
      <img src="/update.jpg" alt="Background" class="absolute inset-0 h-full w-full object-cover" />

      {/* Overlay */}
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div class="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <HomeContent />
      </div>
    </div>
  );
};

export default index;


