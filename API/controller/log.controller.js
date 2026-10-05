var moment = require('moment-timezone');
const model = require("../models/log.model");

function Hour() {
    const items = [];
    new Array(24).fill().forEach(
        (acc, index) => {
            items.push(moment({ hour: index }).format('HH:00:00'));
        }
    )
    return items;
}

const getDateRange = (firstDate, lastDate, hourly) => {

    const hours = Hour()

    console.log(firstDate, lastDate)

    if (firstDate.isSame(lastDate, 'day'))
        return [lastDate];

    let date = firstDate

    let dates = [];

    do {
        dates.push(date.format(process.env.DATE_FORMAT_LONG));
        // console.log("COUNT", date.format(process.env.DATE_FORMAT))
        date = date.add(1, 'days');
    } while (date.isBefore(lastDate));
    return dates;
};

exports.createTable = (periode) => {
    model.create(periode);
}

exports.findDaily = async (request, response) => {
    let params = {
        group: request.query.group,
        date: request.query.date,
        periode: request.query.periode,
    }
    const limit = Number(request.query.limit)
    const offset = Number(request.query.offset)
    if (request.query.limit && request.query.offset) {
        if (limit > 0 && offset >= 0) {
            params.limit = limit
            params.offset = offset
        }
    }
    
    await model.create(params);
    model.findDaily(
        params,
        (err, data) => {
            if (err)
                response.status(500).send({
                    message:
                        err.message || `Some error occurred while retrieving Test .`
                });
            else response.json({ error: false, data });
        }
    )

}