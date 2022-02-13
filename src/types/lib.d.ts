declare module "axios/lib/utils" {
	const utils: {
		isFormData(a: any): boolean;
		forEach(data: any, handler: (val: any, key: string) => void): void;
	};
	export default utils;
}

declare module "axios/lib/core/settle" {
	import { AxiosResponse } from "axios";
	const settle: <T>(
		resolve: (value: AxiosResponse<T>) => void,
		reject: (err: Error) => void,
		res: AxiosResponse<T>,
	) => void;
	export default settle;
}

declare module "axios/lib/helpers/parseHeaders" {
	const parseHeaders: (raw: string) => Record<string, string>;
	export default parseHeaders;
}

declare module "axios/lib/core/createError" {
	import { AxiosRequestConfig } from "axios";

	const createError: (s: string, c: AxiosRequestConfig, reason?: string) => Error;
	export default createError;
}

declare module "axios/lib/helpers/buildURL" {
	const buildURL: (url?: string, params?: any, serializer?: (params: any) => string) => string;
	export default buildURL;
}

declare module "axios/lib/core/buildFullPath" {
	const buildFullPath: (baseURL?: string, requestedURL?: string) => string;
	export default buildFullPath;
}