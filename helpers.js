
export function toJson(object) {
    return object ? JSON.stringify(object, null, 0) : '';
}
