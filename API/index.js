const moment = require("moment");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

var corsOptions = {
    origin: [
        `http://localhost:` + process.env.CLIENT_PORT,
        `http://localhost:3082`,
        process.env.CLIENT_HOST
    ],
    credentials: true,
};
app.use(cors(corsOptions));
console.log("Cors options", corsOptions)

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    return res.json({ message: `Sinergi Portal server. ${moment().format("YYYY-MM-DD HH:MM:ss")}` });
});

require("./routes/praktikum.route")(app);
require("./routes/users.route")(app);
require("./routes/command.route")(app);
require("./routes/log.route")(app);

const PORT = process.env.APP_PORT || 8080;
const server = app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`api_portal Backend Server is running on port ${PORT}.`);
        require("./services/realtime")(server);
    }
});