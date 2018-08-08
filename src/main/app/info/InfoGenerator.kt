package app.info

import kotlin.browser.document
import kotlin.dom.addClass

object InfoGenerator {
    fun create(development: Boolean = false) =
        document.createElement("div").also {
            val content = document.createTextNode("Development: $development")
            it.appendChild(content)
            it.addClass("alarm")
        }
}
