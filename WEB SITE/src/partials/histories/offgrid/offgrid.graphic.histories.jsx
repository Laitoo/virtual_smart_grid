import moment from "moment-timezone";
import { SolidApexCharts } from "solid-apexcharts";
import { createEffect, createSignal, onMount } from "solid-js"
import Radios from "~/components/radio/Radios";
import { CHART_TYPE } from "~/json/chart-type-json";

export default function OffGridGraphicHistories(props) {

    const [format, setFormat] = createSignal("hh");
    const [type, setType] = createSignal("area");
    const [series, setSeries] = createSignal([]);
    const [options, setOptions] = createSignal({})

    const mask = (hourly) => {
        return hourly ? "hh" : "hh:mm"
    }

    createEffect(
        () => {
            setFormat(mask(props.hourly))
        }
    )

    createEffect(
        () => {
            let battCondition = [];
            let battVoltage = [];
            let battCurrent = [];
            let sccVoltage = [];
            let sccCurrent = [];
            let categories = [];
            for (var x = props.rows.length - 1; x >= 0; x--) {
                const row = props.rows[x];
                battCondition.push(row.batteryCondition)
                battVoltage.push(row.batteryVoltage)
                battCurrent.push(row.batteryCurrent)
                sccVoltage.push(row.sccVoltage)
                sccCurrent.push(row.sccCurrent)
                categories.push(moment(row._terminalTime).format(mask(props.hourly)))
            }
            setSeries([
                { name: "Batt.Cond", data: battCondition },
                { name: "Batt.Volt", data: battVoltage },
                { name: "Batt.Current", data: battCurrent },
                { name: "SCC.Volt", data: sccVoltage },
                { name: "SCC.Current", data: sccCurrent },
            ]);
            setOptions(
                {
                    xaxis: {
                        categories,
                    },
                    // colors: ["#3f51b5", "#03a9f4"],
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        width: 1
                    },
                    chart: {
                        toolbar: false
                    },
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    }
                                },
                                legend: {
                                    position: "bottom"
                                }
                            }
                        }
                    ]
                }
            )

        }
    )

    return (
        <div class="mt-8 flex flex-row justify-center items-center gap-x-10 w-full">
            <Radios
                title={"Chart Type"}
                flex={"col"}
                items={[
                    { label: CHART_TYPE.line.value, value: CHART_TYPE.line.value },
                    { label: CHART_TYPE.bar.label, value: CHART_TYPE.bar.value },
                    { label: CHART_TYPE.area.label, value: CHART_TYPE.area.value }
                ]}

                value={type()}
                callback={
                    (value) => {
                        setType(value)
                    }
                }
                disable={props.loading}
            />
            <SolidApexCharts type={type()} options={options()} series={series()} width={"800"} />
        </div>
    )
}