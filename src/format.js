import fs from "node:fs"
import path from "node:path"

const cwd = process.cwd()

function makePath(target) {
    return target[0] === "/" ? target : path.resolve(cwd, target)
}

function makeSet(file) {
    const paths = file.split("/")
    const filename = paths.pop()
    const names = filename.split(".")
    const ext = names.pop()
    return { file, path: paths.join("/"), filename, name: names.join("."), ext }
}

function makeSrc(src) {
    const file = makePath(src)
    try {
        const stat = fs.statSync(file)
        if (stat.isFile()) {
            return makeSet(file)
        }
        throw new Error("none")
    } catch {
        return undefined
    }
}

function makeDest(set, dest, filename) {
    if (!set) return undefined
    const file = makePath(dest)
    return makeSet(path.join(file, filename || set.filename))
}

function makePick(pick) {
    return pick.filter(i => !!i).map(i => {
        return Array.isArray(i) ? i : [i]
    })
}

function format(target) {
    const {
        pick = [],
        src = "./package.json",
        dest = "./dist",
        filename,
        ...others
    } = target || {}

    const srcSet = makeSrc(src)
    const destSet = makeDest(srcSet, dest, filename)

    return { src, dest, pick: makePick(pick), srcSet, destSet, ...others }
}

export default format