package app

import app.info.InfoGenerator
import kotlin.js.console
import kotlin.browser.document

external fun require(module: String): dynamic

fun main(args: Array<String>) {
    require("../asset/css/app.css")

    val env = js("process.env.NODE_ENV")
    console.log("env: $env")

    val infoElement = InfoGenerator.create(env == "development")
    document.body?.appendChild(infoElement)
}
