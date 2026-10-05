import moment from "moment-timezone"

export default function PLTMHTableHistories(props) {

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
                            Turbine Water Flow
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Pressure
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Turbine Rotation
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Voltage
                        </th>  
                         <th scope="col" class="px-6 py-3">
                            Current
                        </th>                        
                    </tr>
                </thead>
                <tbody>
                    {
                        props.rows && props.rows.map(
                            (row,idx) => {
                                console.log(row)
                                return (
                                    <tr class="">
                                        <Box data={idx+1}/>
                                        <Box data={moment.tz(row._terminalTime, 'Asia/Jakarta').format('DD, MMMM YYYY HH:mm')} />
                                        <Box data={row.TurbineWaterFlow}/>
                                        <Box data={row.Pressure}/>
                                        <Box data={row.TurbineRotation}/>
                                        <Box data={row.voltage}/> 
                                        <Box data={row.current}/>
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