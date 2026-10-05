import moment from "moment-timezone"
import { OFFGRID_TAG } from "~/json/offgrid-tag-json"

export default function OffGridTableHistories(props) {

    const Box = (props) => {
        return (
            <td class="p-1">
                <div class="flex flex-row justify-center items-center w-full ">
                    {props.data}
                </div>
            </td>
        )
    }

    return (
        <div class="">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            No.
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Date/Time
                        </th>
                        <th scope="col" class="px-6 py-3">
                            BATT. CONDITION
                        </th>
                        <th scope="col" class="px-6 py-3">
                            BATT. Voltage
                        </th>
                        <th scope="col" class="px-6 py-3">
                            BATT. Current
                        </th>
                        <th scope="col" class="px-6 py-3">
                            SCC VOLTAGE
                        </th>
                        <th scope="col" class="px-6 py-3">
                            SCC CURRENT
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.rows && props.rows.map(
                            (row, idx) => {
                                return (
                                    <tr class="">
                                        <Box data={idx + 1} />
                                        <Box data={moment.tz(row._terminalTime, 'Asia/Jakarta').format('DD, MMMM YYYY HH:mm')} />
                                        <Box data={row.batteryCondition} />
                                        <Box data={row.batteryVoltage} />
                                        <Box data={row.batteryCurrent} />
                                        <Box data={row.sccVoltage} />
                                        <Box data={row.sccCurrent} />
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}