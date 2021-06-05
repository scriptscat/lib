// 单元测试用
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
var gm = "gm";
export default gm;

(<any>global).GM_xmlhttpRequest = function (details: GM_Types.XHRDetails) {
    details.onload && details.onload({
        response: { errcode: 0, errmsg: "", code: 0, msg: "" },
    });
    // var config: AxiosRequestConfig = {
    //     method: details.method,
    //     url: details.url,
    //     headers: details.headers,
    //     data: details.data,
    //     proxy: false,
    // };

    // axios(config)
    //     .then(function (response: AxiosResponse) {
    //         details.onload && details.onload({
    //             response: response.data
    //         })
    //     })
    //     .catch(function (error: AxiosError) {
    //         if (error.isAxiosError) {
    //             details.onerror && details.onerror()
    //         } else {
    //             details.onload && details.onload({
    //                 response: error.response
    //             })
    //         }
    //     });

}

