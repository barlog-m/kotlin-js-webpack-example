import "./css/app.css"

import kotlinApp from "kotlinApp"

console.log("process.env", process.env);

kotlinApp.app.start(process.env.NODE_ENV)
