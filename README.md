Kotlin JavaScript with webpack minimal example
=============================

* [Kotlin](https://kotlinlang.org)
* [webpack](https://webpack.js.org)
* [kotlin-webpack-plugin](https://www.npmjs.com/package/@jetbrains/kotlin-webpack-plugin)

It was not easy to write this example. I think the problem is in the documentation.

Entry point of application is JavaScript index.js. This is done for several reasons.

1. Import resources like css file.
2. Pass value from webpack to determine development mode.

I could not find how do this from Kotlin.

Fake Kotlin main function is in entry in order to prevent "optimization" kotlinApp module by DCE (dead code elimination) tool 

Work only with JDK 8, with JDK 9 it does not work. I could not find the reason. 
