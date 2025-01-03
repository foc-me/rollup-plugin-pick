import { createRequire } from "node:module"
import assert from "node:assert"
import pick from "../src/pick.js"

const require = createRequire(import.meta.url)
const pkg = require("../package.json")

describe("pick up json value", () => {
    it("return the origin with picking up no attributes", () => {
        const target = pick(pkg, { pick: [] })
        assert.equal(target, pkg)
        assert.equal(target === pkg, true)
    })
    it("without target value", () => {
        const option = [
            ["name"],
            ["version"]
        ]
        const target = pick(pkg, { pick: option })
        const entries = Object.entries(target)
        for (const [key, value] of entries) {
            assert.equal(value, pkg[key])
        }
        assert.equal("author" in target, false)
    })
    it("with target value", () => {
        const option = [
            ["name", "another name"],
            ["version", "another version"]
        ]
        const target = pick(pkg, { pick: option })
        const entries = Object.entries(target)
        for (const [key, value] of entries) {
            assert.notEqual(value, pkg[key])
            const index = ["another name", "another version"].indexOf(value)
            assert.equal(index > -1, true)
        }
    })
    it("with transform", () => {
        const option = [
            ["name"],
            ["version"]
        ]
        const transform = (target, pkg) => {
            target.pkg = "pkg"
            target.auther = pkg.auther
            return target
        }
        const target = pick(pkg, { pick: option, transform })
        assert.equal(target.name, pkg.name)
        assert.equal(target.version, pkg.version)
        assert.equal(target.pkg, "pkg")
        assert.equal(target.auther, pkg.auther)
    })
})