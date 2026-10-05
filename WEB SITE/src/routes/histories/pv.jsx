import moment from "moment-timezone";
import ContentLayout from "~/partials/layout/content.layout";
import { createSignal } from "solid-js";
import PVTableHistories from "~/partials/histories/pv/pv.table.histories";
import PVGraphicHistories from "~/partials/histories/pv/pv.graphic.histories";
import { SOCKET_TAG } from "~/json/socket-tag-json";
import { VIEW_MODEL } from "~/json/view-model-json";
import { LOG_PERIODE } from "~/json/log-periode-json";
import WrapperHistories from "~/partials/histories/wrapper.histories";

export default function PVHistories() {

    const group = SOCKET_TAG.pltsPV

    const [firstDate, setFirstDate] = createSignal(new Date());
    const [lastDate, setLastDate] = createSignal(new Date());

    const [periode, setPeriode] = createSignal(LOG_PERIODE.daily.value);
    const [rows, setRows] = createSignal([]);
    const [loading, setLoading] = createSignal(false);
    const [model, setModel] = createSignal(VIEW_MODEL.table.value);

    return (
        <ContentLayout title={`${group.toUpperCase()} Histories`}>
            <WrapperHistories
                loading={loading()}
                firstDate={firstDate()}
                lastDate={lastDate()}
                periode={periode()}
                model={model()}
                group={group}
                rows={rows()}
                callback={
                    {
                        loading: (data) => setLoading(data),
                        periode: (data) => setPeriode(data),
                        firstDate: (data) => {
                            const fDate = moment(data.toString())
                            const lDate = moment(lastDate().toString())
                            setFirstDate(data);
                            if (lDate.isBefore(fDate)) setLastDate(data)
                        },
                        lastDate: (data) => {
                            const lDate = moment(data.toString())
                            const fDate = moment(firstDate().toString())
                            setLastDate(data);
                            if (lDate.isBefore(fDate)) setFirstDate(data)

                        },
                        model: (data) => setModel(data),
                        // row: (data) => setRows([...rows(), ...data])
                        row: (data) => setRows(data)
                    }
                }
            >
                {
                    model() === VIEW_MODEL.table.value
                        ? <PVTableHistories model={model()} periode={periode()} rows={rows()} />
                        : <PVGraphicHistories model={model()} periode={periode()} rows={rows()} />
                }

            </WrapperHistories>
        </ContentLayout>
    )
}