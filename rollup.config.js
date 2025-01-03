import copy from "rollup-plugin-copy"
import pick from "./src/index.js"

export default {
    input: "./src/index.js",
    output: [
        { file: "./dist/index.js", format: "cjs" },
        { file: "./dist/index.esm.js", format: "es" }
    ],
    plugins: [
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
                    "default": "./index.js"
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