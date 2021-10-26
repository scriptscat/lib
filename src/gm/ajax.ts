
export const ajax = _ajax();

function _ajax(baseConfig?: gm.AjaxInstanceConfig): gm.ajax {
	function ajax(url: string | gm.AjaxRequestConfig, config?: gm.AjaxRequestConfig): gm.AjaxPromise {
		return new Promise((resolve, reject) => {
			if (typeof url !== "string") {
				config = url;
			} else {
				if (config) {
					config.url = url;
				} else {
					config = { url: url };
				}
			}
			if (baseConfig) {
				config.url = baseConfig.baseUrl + config.url!;
			}
			config.validateStatus = config.validateStatus || (baseConfig && baseConfig.validateStatus) || ((status: number) => { return status >= 200 && status < 300; });
			let detail = <GM_Types.XHRDetails>Object.assign({}, config);
			if (typeof detail.data === "object") {
				detail.data = JSON.stringify(detail.data);
				detail.overrideMimeType = "application/json";
			}
			detail.onerror = (err: any) => {
				reject({
					message: err,
					config: config
				});
			}
			detail.onload = (resp: GM_Types.XHRResponse) => {
				// 处理返回的header
				let headers: { [key: string]: string | string[] } = {};
				var re = /(.+?):\s*(.+)/g;
				let result;
				while (result = re.exec(resp.responseHeaders!)) {
					result[1] = result[1].toLowerCase();
					switch (typeof headers[result[1]]) {
						case "string":
							headers[result[1]] = [result[1], result[2]];
							break;
						case "object":
							(<string[]>headers[result[1]]).push(result[2]);
							break;
						default:
							headers[result[1]] = result[2];
							break;
					}
				}
				let response = {
					data: resp.response,
					status: resp.status!,
					statusText: resp.statusText!,
					headers: headers,
					config: config!,
				};
				if (config!.validateStatus!(resp.status!)) {
					resolve(response);
				} else {
					reject({
						response: response,
						config: config
					});
				}
			}
			GM_xmlhttpRequest(detail);
		});
	}

	ajax.create = function (config?: gm.AjaxInstanceConfig): gm.ajax {
		return _ajax(config);
	}

	ajax.request = function (config: gm.AjaxRequestConfig): gm.AjaxPromise {
		return ajax(config);
	}

	ajax.get = function (url: string, config?: gm.AjaxRequestConfig): gm.AjaxPromise {
		return ajax(url, config);
	}

	ajax.delete = function (url: string, config?: gm.AjaxRequestConfig): gm.AjaxPromise {
		config = config || { url: url };
		config.method = "DELETE";
		return ajax(url, config);
	}

	ajax.head = function (url: string, config?: gm.AjaxRequestConfig): gm.AjaxPromise {
		config = config || { url: url };
		config.method = "HEAD";
		return ajax(url, config);
	}

	ajax.options = function (url: string, config?: gm.AjaxRequestConfig): gm.AjaxPromise {
		config = config || { url: url };
		config.method = "OPTIONS";
		return ajax(url, config);
	}

	ajax.post = function (url: string, data?: any, config?: gm.AjaxRequestConfig): gm.AjaxPromise {
		config = config || { url: url };
		config.method = "POST";
		config.data = data;
		return ajax(url, config);
	}

	ajax.put = function (url: string, data?: any, config?: gm.AjaxRequestConfig): gm.AjaxPromise {
		config = config || { url: url };
		config.method = "PUT";
		config.data = data;
		return ajax(url, config);
	}

	ajax.patch = function (url: string, data?: any, config?: gm.AjaxRequestConfig): gm.AjaxPromise {
		config = config || { url: url };
		config.method = "PATCH";
		config.data = data;
		return ajax(url, config);
	}
	return ajax;
}
