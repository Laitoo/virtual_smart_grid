const mqtt = require('mqtt');

let client;
let socket = null;

module.exports = async ( url, topics, callback ) => {

    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

    console.log(`Connecting to ${url}`,topics )

    client = mqtt.connect(url, {
        clientId, clean: true, connectTimeout: 4000, reconnectPeriod: 1000
    });

    // Handler "message" didaftarkan sekali di luar "connect". Sebelumnya didaftarkan di dalam
    // "connect", sehingga setiap reconnect menambah handler baru dan pesan diproses berkali-kali.
    client.on( "message", (topic,payload) => {

        let data;
        try {
            data = JSON.parse(payload);
        } catch (error) {
            // Satu payload rusak dari alat tidak boleh menjatuhkan seluruh server API.
            console.log(`MQTT payload bukan JSON valid pada topic '${topic}'`, error.message);
            return;
        }

        const split = topic.split("/");
        const identifier = split[1];
        const group = split[2];
        const code = split[3];

        try {
            callback( socket, group, code, data );
        } catch (error) {
            console.log(`MQTT handler error pada topic '${topic}'`, error);
        }

    })

    client.on( "connect", () => {
        console.log(`MQTT connection to ${url} success, your id ${clientId}`);

        client.subscribe(topics, function (err) {
            if (err) console.log(`Subscribe gagal`, err.message);
            else console.log(`Subscribe to topic '${topics}`)
        })

    })

    client.on( "error", (error) => {
        console.log(`MQTT error: ${error.message}`);
    })

}

module.exports.setSocketForMQTT = (params) => {
    socket = params;
}

module.exports.mqttEmiter = async (params) => {
    const promise = new Promise(
        (resolve,reject) => {
            const json = { [params.data.tag]: params.data.value }
            client.publish(params.command,JSON.stringify(json));
            console.log("realtime/mqtt.service.js",params.command,json)
            resolve({state:true,data:{msg:"emiter ok"}})
        }
    )
    return promise;
}
