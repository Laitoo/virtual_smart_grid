import { createSignal } from "solid-js";
import { UseDataCtx } from "~/context/data.context";
import { SOCKET_TAG } from "~/json/socket-tag-json";
import RealtimeChart from "~/components/chart/GrafikTrent";
import Gauge from "~/components/responsive/Gauge.responsive";
export default function ContentOnGrid(props) {

    const {data} = UseDataCtx()
    const [cls,setCls] = createSignal("animate-in fade-in zoom-inxx duration-700");

    const value = ( attr ) => {
        return data() && data()[SOCKET_TAG.pltsOnGrid] && data()[SOCKET_TAG.pltsOnGrid][attr]
    }

    return (
        <div class={`${cls()}`}>
            <div class="flex flex-col items-center">
                {/* Baris pertama Gauge */}
                <div class="mt-8 flex flex-col gap-y-4 gap-x-10 md:flex-row">
                    <Gauge label="DC Current" color="#FFD700" role="Ampere" value={ value("dcCurrent")} />
                    <Gauge label="DC Voltage" color="#40E0D0" role="Volt" value={ value("dcVoltage")} />
                    <Gauge label="PV Power" color="#FF69B4" role="Watt" value={ value("pvPower")} />
                </div>

                {/* Baris kedua Gauge */}
                <div class="mt-8 flex flex-col gap-x-10 md:flex-row">
                    <Gauge label="AC Current" color="#1F51FF" role="Ampere" value={ value("acCurrent")} />
                    <Gauge label="AC Voltage" color="#32CD32" role="Volt" value={ value("acVoltage")} />
                    <Gauge label="AC Frequency" color="#FF5733" role="Hz" value={ value("acFrequency")} />
                </div>
                <div class="mt-8 flex gap-x-10">
                    <RealtimeChart/>
                </div>
            </div>
        </div>
    )
}