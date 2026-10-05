import InputDate from "~/components/InputDate.";
import Radios from "~/components/radio/Radios";
import Spinner from "~/components/Spinner";
import { LOG_PERIODE } from "~/json/log-periode-json";
import { VIEW_MODEL } from "~/json/view-model-json";

export default function Options(props) {

    return (
        <div class="flex flex-row justify-center items-center gap-2">
            <div class="">
                <Radios
                    title={"View Mode"}
                    items={[
                        { label: VIEW_MODEL.table.label, value: VIEW_MODEL.table.value },
                        { label: VIEW_MODEL.graphic.label, value: VIEW_MODEL.graphic.value }
                    ]}
                    value={props.model.value}
                    callback={
                        (value) => {
                            props.model.callback(value)
                        }
                    }
                    disable={props.loading}
                />
            </div>
            
            <div class="w-full flex flex-row justify-center">
                <InputDate
                    data={props.firstDate.value}
                    callback={(value) => props.firstDate.callback(value)}
                    disable={loading()}
                />
                <InputDate
                    data={props.lastDate.value}
                    callback={(value) => props.lastDate.callback(value)}
                    disable={props.loading}
                />
            </div>
            <div class="">
                <Radios
                    title={"Periode"}
                    items={[
                        { label: LOG_PERIODE.daily.label, value: LOG_PERIODE.daily.value },
                        { label: LOG_PERIODE.hourly.label, value: LOG_PERIODE.hourly.value },
                        { label: LOG_PERIODE.minute.label, value: LOG_PERIODE.minute.value }
                    ]}
                    value={ props.periode.value }
                    callback={
                        (value) => {
                            props.periode.callback(value)
                        }
                    }
                    disable={props.loading}
                />

            </div>
            <div class="flex justify-center items-center h-full">
                <button
                    class="h-full"
                    onclick={
                        () => {
                            props.loadData()
                        }
                    }
                >
                    {props.loading ? <Spinner /> : "Refresh"}
                </button>
            </div>
        </div>
    )
}