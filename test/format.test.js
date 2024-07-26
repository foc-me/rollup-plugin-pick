import path from "node:path"
import assert from "node:assert"
import format from "../src/format.js"

const cwd = process.cwd()

describe("format option", () => {
    it("with default option", () => {
        const config = format()
        assert.equal(config.src, path.resolve(cwd, "./package.json"))
        assert.equal(config.dest, path.resolve(cwd, "./dist"))
        assert.notEqual(config.srcSet, undefined)
        assert.notEqual(config.destSet, undefined)
        assert.equal(config.srcSet.filename, "package.json")
        assert.equal(config.destSet.filename, "package.json")
    })
    it("with uncorrect src", () => {
        const config = format({ src: path.resolve(cwd, "./some.json") })
        assert.equal(config.srcSet, undefined)
        assert.equal(config.destSet, undefined)
    })
    it("with dest", () => {
        const config = format({ dest: path.resolve(cwd, "./dist/client") })
        assert.notEqual(config.srcSet, undefined)
        assert.notEqual(config.destSet, undefined)
        assert.equal(config.srcSet.filename, "package.json")
        assert.equal(config.destSet.filename, "package.json")
    })
    it("with filename", () => {
        const config = format({ dest: path.resolve(cwd, "./dist/client"), filename: "some.json" })
        assert.notEqual(config.srcSet, undefined)
        assert.notEqual(config.destSet, undefined)
        assert.equal(config.srcSet.filename, "package.json")
        assert.equal(config.destSet.filename, "some.json")
    })
})