
export function postJson(url: string, data: any, success: (GM_Types.Listener<GM_Types.XHRResponse>), error: () => void) {
    GM_xmlhttpRequest({
        url: url,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data),
        onload: success,
        onerror: error,
    });
}
