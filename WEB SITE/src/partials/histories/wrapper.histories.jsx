import moment from "moment-timezone";
import { UseAuthCtx } from "~/context/auth.context"
import { db } from "~/lib/db";
import Options from "./options.histories";
import { onMount } from "solid-js";

export default function WrapperHistories(props) {

    const { auth } = UseAuthCtx();

    onMount(
        () => {
            LoadData();
        }
    )

    const LoadData = async () => {
        props.callback.loading(true)
        const token = auth().token;
        const localFormat = "YYYY-MM-DD";
        let date = props.lastDate;
        props.callback.row([])
        while (moment(date).isSameOrAfter(props.firstDate)) {
            await new Promise(
                (resolve, reject) => {
                    const strDate = moment(date.toString()).format(localFormat);
                    db.log.findAll(token, props.group, strDate, props.periode).then(
                        response => {
                            props.callback.row([...props.rows,...response.data])
                            date = moment(date).add(-1, "days");
                            resolve(strDate)
                        }
                    ).catch(
                        error => {
                            reject(error);
                        }
                    )
                }
            )
        }

        props.callback.loading(false)
    }

    return (
        <div class="">
            <Options
                loading={props.loading}
                loadData={
                    () => {
                        LoadData()
                    }
                }
                periode={
                    {
                        value: props.periode,
                        callback: (value) => {
                            props.callback.periode(value)
                        }
                    }
                }
                firstDate={
                    {
                        value: props.firstDate,
                        callback: (value) => props.callback.firstDate(value)
                    }
                }
                lastDate={
                    {
                        value: props.lastDate,
                        callback: (value) => props.callback.lastDate(value)
                    }
                }
                model={
                    {
                        value: props.model,
                        callback: (value) => props.callback.model(value)
                    }
                }
            />
            {props.children}
        </div>
    )
}