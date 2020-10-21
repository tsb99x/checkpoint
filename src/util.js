export function loadJson(itemKey, defaultValue) {
    const json = localStorage.getItem(itemKey)
    return JSON.parse(json) || defaultValue
}

export function saveJson(itemKey, value) {
    const json = JSON.stringify(value)
    localStorage.setItem(itemKey, json)
}
