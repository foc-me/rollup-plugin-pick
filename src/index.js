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
    const { src, charset, srcSet, destSet, pick, transform } = format(option)

    return {
        name: "pick",
        buildEnd: function() {
            try {
                if (!srcSet) throw new Error(`failed to pick up ${src}: file not found`)
                const content = makeContent(srcSet.file, charset)
                const result = pickContent(content, { pick, transform })
                makeFile(result, destSet, charset)
            } catch (error) {
                throw error
            }
        }
    }
}

export default rollupPluginPick