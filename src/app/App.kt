package app

import kotlin.browser.document

// Prevent dead code elimination optimization remove this module
fun main(args: Array<String>) {
	val a = ::start
}

@JsName("start")
fun start(development: Boolean = false) {
	val element = document.createElement("div")
	val content = document.createTextNode("Development: $development")
	element.appendChild(content)

	document.body?.appendChild(element)
}
