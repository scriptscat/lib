// 单元测试用
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

var gmUt = "gm";
export default gmUt;

function GM_xmlhttpRequest(details: GM_Types.XHRDetails) {
    const config: AxiosRequestConfig = {
        method: details.method,
        url: details.url,
        headers: details.headers,
        data: details.data,
        proxy: false,
        responseType: details.responseType,
        validateStatus() {
            return true;
        },
        adapter: undefined,
    };

    axios(config)
        .then(function (response: AxiosResponse) {
            let headers = "";
            for (const key in response.headers) {
                headers += key + ":" + response.headers[key] + "\n"
            }
            let respText = undefined;
            if (!config.responseType || config.responseType == 'text') {
                respText = typeof response.data !== 'string' ? JSON.stringify(response.data) : response.data;
            }
            details.onload && details.onload({
                response: response.data,
                responseText: respText,
                responseHeaders: headers,
                status: response.status,
                statusText: response.statusText
            })
        })
        .catch(function (error: AxiosError) {
            if (error.isAxiosError) {
                details.onerror && details.onerror()
            } else {
                details.onload && details.onload({
                    response: error.response
                })
            }
        });

}
(<any>global).GM_xmlhttpRequest = GM_xmlhttpRequest;

(<any>global).GM = {
    xmlHttpRequest: GM_xmlhttpRequest
};