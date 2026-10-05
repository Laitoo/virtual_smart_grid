const mqtt = require('mqtt');

let client;
let socket = null;

module.exports = async ( url, topics, callback ) => {

    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

    console.log(`Connecting to ${url}`,topics )

    client = mqtt.connect(url, {
        clientId, clean: true, connectTimeout: 4000, reconnectPeriod: 1000
    });

    client.on( "connect", () => {
        console.log(`MQTT connection to ${url} success, your id ${clientId}`);

        client.subscribe(topics, function (err) {
            console.log(`Subscribe to topic '${topics}`)
        })

        client.on( "message", async(topic,payload) => {

            const data = JSON.parse(payload);
            const split = topic.split("/");
            const identifier = split[1];
            const group = split[2];
            const code = split[3];

            // if ( socket && true && (group === "pltmh" ) ) {
                // console.log(`MQTT message received on topic '${topic}'`, identifier, group,code );
                callback( socket, group, code, data );
            // }

        })

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
