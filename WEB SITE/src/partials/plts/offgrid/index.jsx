import { createEffect, createMemo, createSignal } from "solid-js";
import BatteryIndicator from "~/components/metering/Battery"; // Import komponen BatteryIndicator
import Gauge from "~/components/metering/Gauge"; // Import komponen Gauge
import { UseDataCtx } from "~/context/data.context";
import { SOCKET_TAG } from "~/json/socket-tag-json";
import RealtimeChart from "~/components/chart/GrafikTrent";
export default function ContentOffGrid(props) {

    const { data, seData } = UseDataCtx()
    const [cls,setCls] = createSignal("animate-in fade-in zoom-inxx duration-700");


    const value = ( attr ) => {
        return parseFloat(data() && data()[SOCKET_TAG.pltsOffGrid] && data()[SOCKET_TAG.pltsOffGrid][attr])
    }

    return (
        <div class={`${cls()}`}>
            <div class="flex justify-center items-start gap-x-10 mt-8">
                {/* Battery Condition */}
                <div class="flex flex-col justify-center items-center gap-2">
                    <BatteryIndicator />
                    <RealtimeChart/>
                </div>
                {/* Gauge Baris Pertama */}
                <div class="flex flex-col gap-y-8">
                    <div class="flex gap-x-10">
                        <Gauge label="Battery Voltage" color="#00FF7F" role="Volt" value={value("batteryVoltage")} />
                        <Gauge label="Battery Current" color="#FC74FD" role="Ampere" value={value("batteryCurrent")} />
                    </div>

                    {/* Gauge Baris Kedua */}
                    <div class="flex gap-x-10">
                        <Gauge label="SCC Voltage" color="#87CEEB" role="Volt" value={value("sccVoltage")} />
                        <Gauge label="SCC Current" color="#FFA500" role="Ampere" value={value("sccCurrent")}  />
                    </div>
                    <div class="flex gap-x-10">
                    </div>
                </div>
            </div>
        </div>
    )
}