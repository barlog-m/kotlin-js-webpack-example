import org.jetbrains.kotlin.gradle.tasks.Kotlin2JsCompile

plugins {
    id("kotlin2js") version "1.3.21"

    // gradle dependencyUpdates -Drevision=release
    id("com.github.ben-manes.versions") version "0.21.0"
}

repositories {
    jcenter()
}

dependencies {
    implementation(kotlin("stdlib-js"))
    testImplementation(kotlin("test-js"))
}

sourceSets {
    main {
        java.srcDir("$projectDir/main")
    }
    test {
        java.srcDir("$projectDir/test")
    }
}

tasks {
    withType(Kotlin2JsCompile::class).configureEach {
        kotlinOptions {
            metaInfo = true
            freeCompilerArgs = listOf("-progressive")
        }
    }

    wrapper {
        gradleVersion = "5.3.1"
        distributionType = Wrapper.DistributionType.ALL
    }
}
