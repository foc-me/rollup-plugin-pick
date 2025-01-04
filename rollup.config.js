import { createRequire } from "node:module"
import resolve from "@rollup/plugin-node-resolve"
import copy from "rollup-plugin-copy"
import pick from "./src/index.js"

const require = createRequire(import.meta.url)
const pkg = require("./package.json")

const banner = `/**
 * ${pkg.name} v${pkg.version}
 * @license MIT
 * Copyright (c) 2025 - present Fat Otaku Team
 **/`

export default {
    external: ["@focme/stringify-json"],
    input: "./src/index.js",
    output: [
        { file: "./dist/index.js", format: "cjs", banner },
        { file: "./dist/index.esm.js", format: "es", banner }
    ],
    plugins: [
        resolve(),
        copy({
            targets: [
                { src: ["./readme.md"], dest: "./dist" }
            ]
        }),
        pick([
            "name",
            "version",
            "description",
            "keywords",
            ["main", "index.js"],
            ["module", "index.esm.js"],
            ["exports", {
                ".": {
                    "import": "./index.esm.js",
                    "require": "./index.js"
                }
            }],
            ["files", ["index.js", "index.esm.js", "package.json", "readme.md"]],
            "author",
            "repository",
            "license",
            "dependencies"
        ])
    ]
}