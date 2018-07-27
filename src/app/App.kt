package app

import kotlin.js.console
import kotlin.browser.document

external fun require(module: String): dynamic

fun main(args: Array<String>) {
    require("../resources/css/app.css")

    val env = js("process.env.NODE_ENV")
    console.log("env: $env")
    start(env == "development")
}

@JsName("start")
fun start(development: Boolean = false) {
    val element = document.createElement("div")
    val content = document.createTextNode("Development: $development")
    element.appendChild(content)

    document.body?.appendChild(element)
}
