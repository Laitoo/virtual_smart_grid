import Gauge from "~/components/metering/Gauge";
import { UseDataCtx } from "~/context/data.context";
import { SOCKET_TAG } from "~/json/socket-tag-json";
import { UseAuthCtx } from "~/context/auth.context";
import { createEffect, createSignal } from "solid-js";
import { PV_TAG } from "~/json/pv-tag-json";
import ControlsPV from "./controls.pv";
import ChartPV from "./pv.chart";

export default function ContentPV(props) {
  const { data } = UseDataCtx();
  const { auth } = UseAuthCtx();
  const [setToken] = createSignal();
  const [cls] = createSignal(`animate-in fade-in duration-${import.meta.ANIMATE_DURATION}`);

  createEffect(() => {
    setToken(auth() && auth().token);
  });

  const value = (attr) =>
    data() && data()[SOCKET_TAG.pltsPV] && data()[SOCKET_TAG.pltsPV][attr];

  return (
    <div class={`${cls()} px-4 sm:px-6 md:px-10 lg:px-16`}>

      <div class="flex justify-center p-4">
        <ControlsPV />
      </div>

      <div class="mt-8 flex flex-col items-center w-full">
        <div class="flex flex-col md:flex-row justify-between w-full max-w-6xl gap-8">
          {/* I/V Curve */}
          <div class="flex-1 w-full md:w-2/3 min-w-0">
            <ChartPV />
          </div>

          {/* Gauges */}
          <div class="flex flex-col gap-6 w-full md:w-1/3 min-w-[280px]">
            <div class="flex flex-wrap justify-center gap-4">
              <Gauge label="Temperature" color="Lime" role="°C" value={value(PV_TAG.field.temperature)} />
              <Gauge label="Humidity" color="Cyan" role="%" value={value(PV_TAG.field.humidity)} />
              <Gauge label="Light Intensity" color="orange" role="%" value={value(PV_TAG.field.pv_lux)} />
              <Gauge label="Voltage" color="pink" role="V" value={value(PV_TAG.field.voltage)} />
              <Gauge label="Current" color="purple" role="A" value={value(PV_TAG.field.current)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
