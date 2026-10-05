import Gauge from "~/components/metering/Gauge";
import { UseDataCtx } from "~/context/data.context";
import { PLTMH_TAG } from "~/json/pltmh-tag-json";
import { SOCKET_TAG } from "~/json/socket-tag-json";

export default function MetersPLTMH() {
  const { data } = UseDataCtx();

  const value = (attr) => data() && data()[SOCKET_TAG.pltmh] && data()[SOCKET_TAG.pltmh][attr];
  const safeValue = (attr) => {
    const val = value(attr);
    return val !== undefined && val !== null ? val : 0;
  };

  function GaugeGroup({ gauges }) {
    return (
      <div class="flex flex-wrap justify-center gap-6 w-full min-w-0">
        {gauges.map(({ label, color, role, attr }) => (
          <div key={attr} class="flex-shrink-0 min-w-[140px] max-w-[180px] w-full sm:w-auto">
            <Gauge label={label} color={color.toLowerCase()} role={role} value={safeValue(attr)} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div class="w-full px-2 sm:px-4 min-w-0">
      <GaugeGroup
        gauges={[
          { label: "Turbine Water Flow", color: "blue", role: "m³/s", attr: PLTMH_TAG.field.flow },
          { label: "Voltage", color: "green", role: "V", attr: PLTMH_TAG.field.voltage },
          { label: "Current", color: "purple", role: "A", attr: PLTMH_TAG.field.current },
        ]}
      />
      <GaugeGroup
        gauges={[
          { label: "Pressure", color: "brown", role: "psi/bar", attr: PLTMH_TAG.field.pressure },
          { label: "Turbine Rotation", color: "black", role: "RPM", attr: PLTMH_TAG.field.rpm },
        ]}
      />
    </div>
  );
}
