/**
 * 获取本地时区时间：YYYY-MM-dd hh:mm:ss 
 * @param {number} timestamp 毫秒时间戳
 * @returns 
 */
export function getLocalTimeString(timestamp = Date.now()) {
    timestamp += getLocalTimeString.timezoneOffsetMs
    return new Date(timestamp).toISOString().slice(0, -1).replace("T", " ");
}
getLocalTimeString.timezoneOffsetMs = new Date().getTimezoneOffset() * 60 * 1000;