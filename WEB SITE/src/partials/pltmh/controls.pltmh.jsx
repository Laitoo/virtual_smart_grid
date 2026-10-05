import { createSignal } from "solid-js";
import FanSpeedControl from "~/components/control/FanSpeedControl";
import ToggleSwitch from "~/components/control/OnOff";
import { UseAuthCtx } from "~/context/auth.context";
import { UseDataCtx } from "~/context/data.context";
import { PLTMH_TAG } from "~/json/pltmh-tag-json";
import { SOCKET_TAG } from "~/json/socket-tag-json";

export default function ControlsPLTMH() {
  const { auth } = UseAuthCtx();
  const { data, command } = UseDataCtx();
  const [cls] = createSignal("animate-in fade-in zoom-inxx duration-700");

  const value = (attr) => data() && data()[SOCKET_TAG.pltmh] && data()[SOCKET_TAG.pltmh][attr];
  const safeValue = (attr) => {
    const val = value(attr);
    return val !== undefined && val !== null ? val : false;
  };

  const toggleCommand = (tag, val) => {
    command(SOCKET_TAG.pltmh, { tag, value: val ? "1" : "1" }, auth().token);
  };

  const turbines = [
    { label: "PELTON", tag: PLTMH_TAG.command.pelton, attr: PLTMH_TAG.field.pelton },
    { label: "CROSS FLOW", tag: PLTMH_TAG.command.crossFlow, attr: PLTMH_TAG.field.crossFlow },
    { label: "KAPLAN", tag: PLTMH_TAG.command.kaplan, attr: PLTMH_TAG.field.kaplan },
    { label: "FRANCIS", tag: PLTMH_TAG.command.francis, attr: PLTMH_TAG.field.francis },
  ];

  return (
    <div class={`${cls()} flex flex-col items-center w-full gap-8 px-2 py-4 min-w-0`}>
      {/* Pump Speed Control */}
      <div class="w-full max-w-lg flex flex-col sm:flex-row justify-center items-center gap-6 min-w-0">
        <FanSpeedControl
          label="PUMP SPEED CONTROL"
          value={value(PLTMH_TAG.field.pumpSpeed)}
          description={`${((value(PLTMH_TAG.field.pumpSpeed) || 0) / 10000 * 50).toFixed(2)} Herz`}
          callback={(dec, inc) => {
            let tag = "";
            if (dec === 1 && inc === 0) tag = PLTMH_TAG.command.pumpDown;
            if (inc === 1 && dec === 0) tag = PLTMH_TAG.command.pumpUp;
            if (tag) command(SOCKET_TAG.pltmh, { tag, value: "1" }, auth().token);
          }}
        />
      </div>

      {/* Turbine Toggles */}
      <div class="grid grid-cols-1xx sm:grid-cols-2 gap-6 w-full max-w-lg min-w-0">
        {turbines.map(({ label, tag, attr }) => (
          <div key={tag} class="flex justify-center min-w-0">
            <ToggleSwitch
              label={label}
              value={safeValue(attr)}
              callback={(val) => toggleCommand(tag, val)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
