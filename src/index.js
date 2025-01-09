import fs from "node:fs"
import stringify from "@focme/stringify-json"
import format from "./format.js"
import pickContent from "./pick.js"

function makeContent(file, charset) {
    return JSON.parse(fs.readFileSync(file, charset))
}

function makeFile(content, set, charset) {
    const json = stringify(content)
    const { file, path } = set
    if (!fs.existsSync(path) || !fs.statSync(path).isDirectory()) {
        fs.mkdirSync(path, { recursive: true })
    }
    fs.writeFileSync(file, json, { charset })
}

function rollupPluginPick(option) {
    option = Array.isArray(option) ? { pick: option } : option
    const target = format(option)

    return {
        name: "pick",
        buildEnd: function() {
            const { charset, srcSet, destSet } = target
            if (!srcSet) {
                console.warn(`${srcSet.file} not found`)
                return
            }
            if (srcSet.ext !== "json") {
                console.warn(`${srcSet.file} is not a json file`)
                return
            }

            try {
                const content = makeContent(srcSet.file, charset)
                const result = pickContent(content, target)
                makeFile(result, destSet, charset)
            } catch (error) {
                console.error(`failed to pick up ${srcSet.file}`)
                throw error
            }
        }
    }
}

export default rollupPluginPick