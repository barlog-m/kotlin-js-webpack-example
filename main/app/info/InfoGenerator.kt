package app.info

import kotlin.browser.document
import kotlin.dom.addClass

object InfoGenerator {
    fun create(development: Boolean = false) =
        document.createElement("div").also { div ->
            div.appendChild(document.createTextNode("Development: "))

            document.createElement("span").also { v ->
                v.appendChild(document.createTextNode("$development"))
                v.addClass("alarm")
                div.appendChild(v)
            }
        }
}
