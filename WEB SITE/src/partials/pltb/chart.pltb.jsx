import { createEffect, createMemo, createSignal, onMount, Show } from "solid-js"
import RealtimeChart from "~/components/chart/GrafikTrent"
import { UseDataCtx } from "~/context/data.context"
import { SOCKET_TAG } from "~/json/socket-tag-json";


export default function ChartPLTB() {

    const { data } = UseDataCtx();
    const [windspeed, setwindspeed] = createSignal([]);
    const [voltages, setVoltages] = createSignal([]);
    const [currents, setCurrents] = createSignal([]);

    const value = (attr) => {
        return data() && data()[SOCKET_TAG.pltb] && data()[SOCKET_TAG.pltb][attr];
    }

    onMount(() => {
        const max = 100; // Range data maksimum
        const min = 10;  // Range data minimum
        const interval = 2000; // Update setiap 1 detik
        // let lastDate = new Date().getTime();
        let maxDataPoints = 10; // Batas data points maksimal

        setInterval(() => {

            const currentDate = new Date().getTime();

            setVoltages((prevData) => {
                const newData = [...prevData];

                // Tambahkan data baru
                newData.push({ x: currentDate, y: value("voltage") });

                // Hapus data lama jika melebihi maksimum
                if (newData.length > maxDataPoints) newData.shift();

                return newData;
            });

            setCurrents((prevData) => {
                const newData = [...prevData];

                // Tambahkan data baru
                newData.push({ x: currentDate, y: value("current") });

                // Hapus data lama jika melebihi maksimum
                if (newData.length > maxDataPoints) newData.shift();

                return newData;
            });

            setwindspeed((prevData) => {
                const newData = [...prevData];

                // Tambahkan data baru
                newData.push({ x: currentDate, y: value("windSpeed") });

                // Hapus data lama jika melebihi maksimum
                if (newData.length > maxDataPoints) newData.shift();

                return newData;
            });

            // console.log("PLTMH",voltages(),currents())

        }, interval);

    });

    return (
        <div class="">
            <RealtimeChart
                title="Realtime Voltage & Current"
                series=
                {
                    [
                        {
                            name: "Voltage",
                            data: voltages(), // Data awal kosong
                        },
                        {
                            name: "Current",
                            data: currents(), // Data awal kosong
                        },

                        {
                            name: "windspeed",
                            data: windspeed(), // Data awal kosong
                        }

                    ]
                }
            />
        </div>
    )
}