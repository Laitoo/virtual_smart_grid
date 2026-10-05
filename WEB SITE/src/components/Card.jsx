import { A, useNavigate } from "@solidjs/router";

export default function Card(props) {

  const navigate = useNavigate()

  return (
    <div class={`relative bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg w-full ${props.animation}`}>
      <img
        src={props.imageUrl}
        alt={props.title}
        class="object-cover w-full h-40 opacity-70"
      />
      <div class="absolute inset-0 flex flex-col justify-between p-4">
        <div>
          <h2 class="text-xl font-bold">{props.title}</h2>
          <p>{props.description}</p>
        </div>
        <button
          onClick={ () => navigate(props.url) }
          class="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 self-start"
        >
          {/* <A href={props.url}> */}
          Click here
          {/* </A> */}
        </button>
      </div>
    </div>
  );
}
