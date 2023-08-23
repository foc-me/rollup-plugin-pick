function makeResult(content, pick = []) {
    if (pick.length < 1) return content

    const results = []
    for (let [key, value] of pick) {
        if (!value) value = content[key]
        if (typeof value === "function") {
            value = value(content)
        }
        if (value !== undefined && value !== null) {
            results.push({ [key]: value })
        }
    }

    return Object.assign({}, ...results)
}

function pickContent(content, option) {
    const { pick = [], transform } = option
    const result = makeResult(content, pick)

    return typeof transform === "function" ? transform(result, content) : result
}

export default pickContent