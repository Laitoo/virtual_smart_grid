import { createSignal } from "solid-js";
import LightControl from "~/components/control/LightControl";
import ToggleSwitch from "~/components/control/OnOff";
import ServoMotor from "~/components/control/ServoMotor";
import { UseAuthCtx } from "~/context/auth.context";
import { UseDataCtx } from "~/context/data.context";
import { PV_TAG } from "~/json/pv-tag-json";
import { SOCKET_TAG } from "~/json/socket-tag-json";

export default function ControlsPV(props) {
  const { auth } = UseAuthCtx();
  const { data, command } = UseDataCtx();
  const [cls] = createSignal("animate-in fade-in zoom-inxx duration-700");

  const value = (attr) =>
    data() && data()[SOCKET_TAG.pltsPV] && data()[SOCKET_TAG.pltsPV][attr];

  return (
    // <div class={`${cls()} w-full gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8`}>
    <div class={`${cls()} w-full`}>
      {/* Toggle Switches */}

      <div class="w-full flex flex-row justify-center items-center gap-4 p-4 col-span-full sm:col-span-1 md:col-span-3 lg:col-span-7">
        <div class="flex flex-col gap-6">
          <ToggleSwitch
            label={"FAN"}
            value={value(PV_TAG.field.fan)}
            callback={() => {
              command(
                SOCKET_TAG.pltsPV,
                { tag: PV_TAG.command.fan, value: value(PV_TAG.field.fan) ? "0" : "1" },
                auth().token
              );
            }}
          />
        </div>

        <div class="flex flex-col gap-6">
          <ToggleSwitch
            label={"HEATER"}
            value={value(PV_TAG.field.heater)}
            callback={() => {
              command(
                SOCKET_TAG.pltsPV,
                { tag: PV_TAG.command.heater, value: value(PV_TAG.field.heater) ? "0" : "1" },
                auth().token
              );
            }}
          />
        </div>
      </div>

      {/* ServoMotor dan LightControl */}
      {/* <div class="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 justify-center items-center col-span-full sm:col-span-1 md:col-span-3 lg:col-span-7"> */}
      <div class="w-full flex flex-col justify-center items-center gap-4 md:flex-row">
        <div class="flex justify-center w-full sm:w-1/2 md:w-full lg:w-1/3">
          <ServoMotor
            value={value(PV_TAG.field.tiltServo)}
            callback={(dec, inc) => {
              let tag = "";
              if (dec === 1 && inc === 0) tag = PV_TAG.command.servoDown;
              if (inc === 1 && dec === 0) tag = PV_TAG.command.servoUp;
              command(SOCKET_TAG.pltsPV, { tag, value: "1" }, auth().token);
            }}
          />
        </div>
        <div class="flex justify-center w-full sm:w-1/2 md:w-full lg:w-1/3">
          <LightControl
            key={value(PV_TAG.field.dimmer)} // opsional untuk re-render
            value={value(PV_TAG.field.dimmer)}
            callback={(tag,data) => {
              command(
                SOCKET_TAG.pltsPV,
                { tag: tag, value: `${data}` },
                auth().token
              );
            }}
          />
        </div>
      </div>

    </div>
  );
}
