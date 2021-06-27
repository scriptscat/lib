// 单元测试用
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';

var gmUt = "gm";
export default gmUt;

(<any>global).GM_xmlhttpRequest = function (details: GM_Types.XHRDetails) {
    const config: AxiosRequestConfig = {
        method: details.method,
        url: details.url,
        headers: details.headers,
        data: details.data,
        proxy: false,
        responseType: details.responseType,
    };

    axios(config)
        .then(function (response: AxiosResponse) {
            let headers = "";
            for (const key in response.headers) {
                headers += key + ":" + response.headers[key] + "\n"
            }
            details.onload && details.onload({
                response: response.data,
                responseHeaders: headers,
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

