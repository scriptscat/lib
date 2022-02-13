import axios, { AxiosAdapter, AxiosInstance, AxiosRequestConfig, AxiosStatic } from "axios";
import adapter from "./axios-adapter";

export const ajax = <AxiosStatic>axios.create({
	adapter: <AxiosAdapter>adapter
});

ajax.create = (config?: AxiosRequestConfig): AxiosInstance => {
	if (config) {
		config.adapter = config.adapter || <AxiosAdapter>adapter;
	}
	return axios.create(config);
}
