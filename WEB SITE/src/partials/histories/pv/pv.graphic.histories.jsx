import moment from "moment-timezone";
import { SolidApexCharts } from "solid-apexcharts";
import { createEffect, createSignal, onMount } from "solid-js"
import Radio from "~/components/radio/Radios";
import { CHART_TYPE } from "~/json/chart-type-json";
import { LOG_PERIODE } from "~/json/log-periode-json";

export default function PVGraphicHistories(props) {

    const [format, setFormat] = createSignal("dd");
    const [type, setType] = createSignal("area");
    const [series, setSeries] = createSignal([]);
    const [options, setOptions] = createSignal({})
    const mask = (hourly) => {
        return hourly ? 10 : 43
    }

    const formater = (periode) => {
        let ret = "hh:mm";
        switch (periode) {
            case LOG_PERIODE.daily.value:
                ret = "DD"
                break;
            case LOG_PERIODE.hourly.value:
                ret = "hh"
                break;
            default:
                ret = "hh:mm"
                break;
        }
        return ret;
    }

    createEffect(
        () => {
            setFormat(props.periode)
        }
    )

    createEffect(
        () => {
            let dataV = [];
            let dataI = [];
            let dataLux = [];
            let categories = [];
            for (var x = props.rows.length - 1; x >= 0; x--) {
                const row = props.rows[x];
                dataV.push(row.voltage)
                dataI.push(row.current)
                dataLux.push(row.Humidity)
                categories.push(moment(row._terminalTime).format(formater(props.periode)))
            }
            setSeries([
                { name: "voltage", data: dataV.reverse(), type: type() },
                { name: "current", data: dataI.reverse(), type: type() },
                { name: "Humidity", data: dataLux.reverse(), type: type() },
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
                        width: type() === "line" ? 4 : 1
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
            <div class="">
                <Radio
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

            </div>
            <SolidApexCharts type="area" options={options()} series={series()} width={"800"} />
        </div>
    )
}