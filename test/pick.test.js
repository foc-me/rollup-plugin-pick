import pick from "../src/pick.js"
import assert from "node:assert"
import origin from "../package.json" assert { type: "json" }

describe("pick up json value", () => {
    it("return the origin with picking up no attributes", () => {
        const target = pick(origin, { pick: [] })
        assert.equal(target, origin)
        assert.equal(target === origin, true)
    })
    it("without target value", () => {
        const option = [
            ["name"],
            ["version"]
        ]
        const target = pick(origin, { pick: option })
        const entries = Object.entries(target)
        for (const [key, value] of entries) {
            assert.equal(value, origin[key])
        }
        assert.equal("author" in target, false)
    })
    it("with target value", () => {
        const option = [
            ["name", "another name"],
            ["version", "another version"]
        ]
        const target = pick(origin, { pick: option })
        const entries = Object.entries(target)
        for (const [key, value] of entries) {
            assert.notEqual(value, origin[key])
            const index = ["another name", "another version"].indexOf(value)
            assert.equal(index > -1, true)
        }
    })
    it("with transform", () => {
        const option = [
            ["name"],
            ["version"]
        ]
        const transform = (target, origin) => {
            target.origin = "origin"
            target.auther = origin.auther
            return target
        }
        const target = pick(origin, { pick: option, transform })
        assert.equal(target.name, origin.name)
        assert.equal(target.version, origin.version)
        assert.equal(target.origin, "origin")
        assert.equal(target.auther, origin.auther)
    })
})