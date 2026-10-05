import FanSpeedControl from "~/components/control/FanSpeedControl";
import Gauge from "~/components/metering/Gauge";
import { UseDataCtx } from "~/context/data.context";
import { SOCKET_TAG } from "~/json/socket-tag-json";
import { PLTB_TAG } from "~/json/pltb-tag-json";
import { UseAuthCtx } from "~/context/auth.context";
import { createSignal, onMount } from "solid-js";
import ChartPLTB from "./chart.pltb";

export default function ContentPLTB(props) {

    const { data, command } = UseDataCtx();
    const { auth } = UseAuthCtx();
    const [cls, setCls] = createSignal("animate-in fade-in zoom-inxx duration-700");


    const value = (attr) => {
        return data() && data()[SOCKET_TAG.pltb] && data()[SOCKET_TAG.pltb][attr];
    }

    return (
        <div class={`${cls()}`}>
            <div class="flex flex-row justify-center items-center gap-5">
                <FanSpeedControl
                    value={value(PLTB_TAG.field.fanStep)}
                    description={`${value(PLTB_TAG.field.vfdHerz)} Herz`}
                    callback={
                        (dec, inc) => {
                            let tag = "";
                            if (dec === 1 && inc === 0) tag = PLTB_TAG.command.fanDown;
                            if (inc === 1 && dec === 0) tag = PLTB_TAG.command.fanUp;
                            command(SOCKET_TAG.pltb, { tag, value: "1" }, auth().token);
                        }
                    }
                />
            </div>
            <div class="flex flex-row items-center justify-center gap-4">
                <div class="mt-8 flex flex-row flex-wrap justify-center items-center gap-x-5 gap-y-4">
                    <Gauge label="Wind Speed" color="Beige" role="m/s" value={value("windSpeed")} />
                    <Gauge label="Current" color="Teal" role="ampere" value={value("current")} />
                    <Gauge label="Voltage" color="pink" role="Volt" value={value("voltage") / 100 } />
                    <Gauge label="Turbine Rotation" color="blue" role="RPM" value={value("turbinRotation")} />
                </div>
            </div>
            <div class="mt-8 flex flex-row justify-center items-center gap-x-10">
                    <ChartPLTB />
            </div>
        </div>
    );
}
