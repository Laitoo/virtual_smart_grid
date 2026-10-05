import { createSignal, onMount, onCleanup } from "solid-js";
import ControlsPLTMH from "./controls.pltmh";
import MetersPLTMH from "./meters.pltmh";
import RealtimeChart from "~/components/chart/GrafikTrent";
import ChartPLTMH from "./chart.pltmh";

export default function ContentPLTMH(props) {
  const max = props.max || 100;
  const min = props.min || 10;
  const interval = props.interval || 2000;
  const maxDataPoints = props.maxDataPoints || 20;

  const cls = "animate-in fade-in zoom-inxx duration-700";

  const [voltages, setVoltages] = createSignal([]);
  const [currents, setCurrents] = createSignal([]);

  onMount(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();

      setVoltages((prev) => {
        const data = [...prev, { x: now, y: Math.floor(Math.random() * (max - min + 1)) + min }];
        return data.length > maxDataPoints ? data.slice(1) : data;
      });

      setCurrents((prev) => {
        const data = [...prev, { x: now, y: Math.floor(Math.random() * (max - min + 1)) + min }];
        return data.length > maxDataPoints ? data.slice(1) : data;
      });
    }, interval);

    onCleanup(() => clearInterval(intervalId));
  });

  return (
    <div
      class={`${cls} flex flex-col md:flex-row gap-6 p-4 min-h-screen`}
      style={{ overflowX: "hidden" }}
    >
      {/* Controls */}
      <div class="flex-shrink-0 w-full md:w-1/3 min-w-0">
        <ControlsPLTMH />
      </div>

      {/* Meters dan Chart */}
      <div class="flex-grow w-full md:w-2/3 flex flex-col gap-6 min-w-0">
        <MetersPLTMH />
        <ChartPLTMH/>
      </div>
    </div>
  );
}
