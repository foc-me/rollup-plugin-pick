import fs from "node:fs"
import path from "node:path"

const cwd = process.cwd()

function makeSet(file) {
    const filename = file.split(/[\\\/]/g).pop()
    const [name, ext] = filename.split(".")
    return { file, path: path.resolve(file, "../"), filename, name, ext }
}

function makeSrc(src) {
    return fs.existsSync(src) && fs.statSync(src).isFile() ? makeSet(src) : undefined
}

function makeDest(set, dest, filename) {
    return set ? makeSet(path.join(dest, filename || set.filename)) : undefined
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

    const srcPath = path.isAbsolute(src) ? src : path.resolve(cwd, src)
    const destPath = path.isAbsolute(dest) ? src : path.resolve(cwd, dest)
    const srcSet = makeSrc(srcPath)
    const destSet = makeDest(srcSet, destPath, filename)

    return { src: srcPath, dest: destPath, pick: makePick(pick), srcSet, destSet, ...others }
}

export default format