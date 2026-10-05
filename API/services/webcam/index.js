const NodeWebcam = require("node-webcam");

module.exports = async (ioObject) => {

    let counter = 0;

    var opts = {

        //Picture related

        // width: 1280,
        // height: 720,
        // quality: 100,

        width: 50,
        height: 50,
        quality: 10,

        // Number of frames to capture
        // More the frames, longer it takes to capture
        // Use higher framerate for quality. Ex: 60

        frames: 10,

        //Delay in seconds to take shot
        //if the platform supports miliseconds
        //use a float (0.1)
        //Currently only on windows

        delay: 0,

        //Save shots in memory

        saveShots: false,

        // [jpeg, png] support varies
        // Webcam.OutputTypes

        output: "jpeg",

        //Which camera to use
        //Use Webcam.list() for results
        //false for default device

        device: false,

        // [location, buffer, base64]
        // Webcam.CallbackReturnTypes

        // callbackReturn: "location",
        callbackReturn: "base64"

        //Logging

        // verbose: false

    };

    var Webcam = NodeWebcam.create(opts);

    const capture = () => {

        NodeWebcam.capture("test_picture", opts, function (err, data) {
            // var image = "<img src='" + data + "'>";
            if (err) {
                console.log(err)
            } else {
                ioObject.sockets.emit("webcam", data);
                capture()
                console.log("webcam capturing " + counter++);
            };
        });
    }

    capture();

    Webcam.list(function (list) {

        //Use another device
        var anotherCam = NodeWebcam.create({ device: list[0] });
    });

}