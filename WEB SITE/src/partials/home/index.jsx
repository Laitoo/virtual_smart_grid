import { useNavigate } from "@solidjs/router";
import { UseAuthCtx } from "~/context/auth.context";

export default function HomeContent() {
  const navigate = useNavigate();

  const { auth, isLogin } = UseAuthCtx();

  const handleLogin = () => {
    auth()
      ? navigate("/dashboard")
      : navigate(import.meta.env.VITE_REDIRECT_TO_LOGIN);
  };

  return (
    <div class="text-center max-w-3xl h-screen ">
      <div class="flex flex-col justify-center items-center h-full">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-light mb-4">
          Selamat Datang Pada Praktikum Energi Baru Terbarukan
        </h1>
        <p class="text-lg sm:text-xl md:text-2xl mb-8">
          Silahkan Login Terlebih Dahulu!
        </p>
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg animate-bounce repeat-infinite"
          onClick={handleLogin}
        >
          {
            isLogin() ? "MORE" : "LOGIN"
          }
        </button>
      </div>
    </div>
  );
}
