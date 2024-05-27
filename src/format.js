import fs from "node:fs"
import path from "node:path"

const cwd = process.cwd()
const spliter = cwd.includes("/") ? "/" : "\\"

function relativePath(src) {
    return /^[\.]{1,2}[\\/]/.test(src)
}

function makeSet(file) {
    const paths = file.split(spliter)
    const filename = paths.pop()
    const names = filename.split(".")
    const ext = names.pop()
    return { file, path: paths.join(spliter), filename, name: names.join("."), ext }
}

function makeSrc(src) {
    try {
        const stat = fs.statSync(src)
        if (stat.isFile()) {
            return makeSet(src)
        }
        throw new Error("none")
    } catch {
        return undefined
    }
}

function makeDest(set, dest, filename) {
    if (!set) return undefined
    return makeSet(path.join(dest, filename || set.filename))
}

function makePick(pick) {
    return pick.filter(i => !!i).map(i => {
        return Array.isArray(i) ? i : [i]
    })
}

function format(target) {
    const {
        pick = [],
        src = path.resolve(cwd, "./package.json"),
        dest = path.resolve(cwd, "./dist"),
        filename,
        ...others
    } = target || {}

    if (relativePath(src) || relativePath(dest)) throw new Error("option.src or option.dest must be absolute path")

    const srcSet = makeSrc(src)
    const destSet = makeDest(srcSet, dest, filename)

    return { src, dest, pick: makePick(pick), srcSet, destSet, ...others }
}

export default format