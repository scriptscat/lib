import { IAxiosRetry } from "@App/types/gm";
import axios, { AxiosAdapter, AxiosInstance, AxiosRequestConfig, AxiosStatic } from "axios";
import axiosRetry from "axios-retry";
import adapter from "./axios-adapter";

export const ajax = <AxiosStatic & { ajaxRetry: IAxiosRetry }>axios.create({
	adapter: <AxiosAdapter>adapter
});

ajax.create = (config?: AxiosRequestConfig): AxiosInstance => {
	if (config) {
		config.adapter = config.adapter || <AxiosAdapter>adapter;
	}
	return axios.create(config);
}

ajax.ajaxRetry = axiosRetry;
