import moment from "moment-timezone";
import { SolidApexCharts } from "solid-apexcharts";
import { createEffect, createSignal, onMount } from "solid-js"
import Radios from "~/components/radio/Radios";
import { CHART_TYPE } from "~/json/chart-type-json";

export default function PLTMHGraphicHistories(props) {

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
            let dataVDC = [];
            let dataIDC = [];
            let dataVAC = [];
            let dataIAC = [];
            let categories = [];
            for (var x = props.rows.length - 1; x >= 0; x--) {
                const row = props.rows[x];
                dataVDC.push(row.dcVoltage)
                dataIDC.push(row.dcCurrent)
                dataVAC.push(row.acVoltage)
                dataIAC.push(row.acVoltage)
                categories.push(moment(row._terminalTime).format(mask(props.hourly)))
            }
            setSeries([
                { name: "VDC", data: dataVDC },
                { name: "IDC", data: dataIDC },
                { name: "VAC", data: dataVAC },
                { name: "IAC", data: dataIAC },
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