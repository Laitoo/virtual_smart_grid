import { SOCKET_TAG } from "~/json/socket-tag-json";

export const db = {
    user: {
        async login(data) {
            const url = import.meta.env.VITE_API_SERVER_HOST + "/user/login";
            // console.log("db.jsx",url,data)
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            console.log("db.jsx", response.statusText)
            let json = await response.json()
            // if (json.error) {
            //     json = { error: json.error }
            // }
            console.log("db.jsx", json)
            return json
        },
        async findByToken(data) {
            const url = import.meta.env.VITE_API_SERVER_HOST + "/user/byToken";
            // console.log("db.jsx",url,data)
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": data.token
                },
                body: JSON.stringify(data),
            })
            const json = await response.json()
            // console.log("db.jsx/user:login",response, json)
            return json
        },
        async findAll(token) {
            const url = import.meta.env.VITE_API_SERVER_HOST + "/user";
            // console.log("db.jsx",url)
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
            const json = await response.json()
            // console.log("db.jsx/user:findAll",json)
            return json
        },
    },
    command: {
        async [SOCKET_TAG.pltsPV](data, token) {
            const url = import.meta.env.VITE_API_SERVER_HOST + "/command/pv";
            console.log("db.jsx/command:pv",url, data)
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(data),
            })
            const json = await response.json()
            // console.log("db.jsx/command",json)
            return json
        },
        async pltb(data, token) {
            const url = import.meta.env.VITE_API_SERVER_HOST + "/command/pltb";
            // console.log("db.jsx/command:pltb",url,token)
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(data),
            })
            const json = await response.json()
            return json
        },
        async pltmh(data, token) {
            const url = import.meta.env.VITE_API_SERVER_HOST + "/command/pltmh";
            const fetcher = async (url, params) => {
                const response = await fetch(url, params);
                const json = await response.json()
                return json;
            };
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(data),
            }
            const json = await fetcher(url, params)
            // console.log("db.jsx/command:pltmh", url, json)
            return json
        }
    },
    log: {
        async findAll(token, group, date, periode, limit = -1, offset = -1) {
            const url = import.meta.env.VITE_API_SERVER_HOST + `/log/daily?limit=${limit}&offset=${offset}&periode=${periode}&group=${group}&date=${date}`;
            console.log("db.jsx/log", url)
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
            const json = await response.json()
            // console.log("db.jsx/log:findAll",json)
            return json
        },
        async findLoop(params, callback) {

        }
    },
}
