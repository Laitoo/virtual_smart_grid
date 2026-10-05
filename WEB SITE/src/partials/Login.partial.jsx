import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router"; // Import useNavigate
import style from "../css/login.module.css";
import { UseAuthCtx } from "~/context/auth.context";

export default function Login() {
  const { auth, setAuth } = UseAuthCtx();
  const [username, setusername] = createSignal(auth().username);
  const [password, setPassword] = createSignal("");
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuth({username: username()})
    navigate("/dashboard");
  };

  return (
    <div
      class={`${style.formcontainer} min-h-64 flex flex-col p-8 justify-center items-center bg-white shadow-lg rounded-lg`}
    >
      {/* Header Section */}
      <div class="text-center mb-8">
        <h1 class="font-serif text-xl font-bold">WELCOME</h1>
        <p class="font-serif text-lg">PRAKTIKUM PENERAPAN SISTEM</p>
        <p class="font-serif text-lg">CERDAS ENERGI BARU TERBARUKAN</p>
      </div>

      {/* Form Section */}
      <div class="w-full max-w-sm flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} class="w-full">
          <label class="block mb-2 font-medium text-gray-700">
            Username:
            <input
              type="text"
              value={username()}
              onInput={(e) => setusername(e.target.value)}
              class="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            />
          </label>

          <label class="block mb-4 font-medium text-gray-700">
            Password:
            <input
              type="password"
              value={password()}
              onInput={(e) => setPassword(e.target.value)}
              class="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            />
          </label>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
