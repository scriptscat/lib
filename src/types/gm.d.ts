
declare namespace gm {

    const ajax: AxiosStatic & { ajaxRetry: IAxiosRetry; };

    interface NotificationDetails {
        text?: string
        title?: string
        image?: string
        highlight?: boolean
        silent?: boolean
        timeout?: number
        onclick?: GM_Types.NotificationOnClick
        ondone?: GM_Types.NotificationOnDone
        progress?: number
        oncreate?: GM_Types.NotificationOnClick
        buttons?: GM_Types.NotificationButton[]
    }

    interface NotificationInstance {
        update(details: NotificationDetails);
        close();
        done(callback: () => void);
        click(callback: () => void);
    }

    function notification(title: string, content: string, details?: NotificationDetails): Promise<NotificationInstance>;

}

// ------------- 复制来自axios -------------------
// TypeScript Version: 3.0

type AxiosRequestHeaders = Record<string, string | number | boolean>;

type AxiosResponseHeaders = Record<string, string> & {
    "set-cookie"?: string[]
};

interface AxiosRequestTransformer {
    (data: any, headers?: AxiosRequestHeaders): any;
}

interface AxiosResponseTransformer {
    (data: any, headers?: AxiosResponseHeaders): any;
}

interface AxiosAdapter {
    (config: AxiosRequestConfig): AxiosPromise;
}

interface AxiosBasicCredentials {
    username: string;
    password: string;
}

interface AxiosProxyConfig {
    host: string;
    port: number;
    auth?: {
        username: string;
        password: string;
    };
    protocol?: string;
}

type Method =
    | 'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'
    | 'purge' | 'PURGE'
    | 'link' | 'LINK'
    | 'unlink' | 'UNLINK';

type ResponseType =
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream';

type responseEncoding =
    | 'ascii' | 'ASCII'
    | 'ansi' | 'ANSI'
    | 'binary' | 'BINARY'
    | 'base64' | 'BASE64'
    | 'base64url' | 'BASE64URL'
    | 'hex' | 'HEX'
    | 'latin1' | 'LATIN1'
    | 'ucs-2' | 'UCS-2'
    | 'ucs2' | 'UCS2'
    | 'utf-8' | 'UTF-8'
    | 'utf8' | 'UTF8'
    | 'utf16le' | 'UTF16LE';

interface TransitionalOptions {
    silentJSONParsing?: boolean;
    forcedJSONParsing?: boolean;
    clarifyTimeoutError?: boolean;
}

interface AxiosRequestConfig<D = any> {
    url?: string;
    method?: Method;
    baseURL?: string;
    transformRequest?: AxiosRequestTransformer | AxiosRequestTransformer[];
    transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
    headers?: AxiosRequestHeaders;
    params?: any;
    paramsSerializer?: (params: any) => string;
    data?: D;
    timeout?: number;
    timeoutErrorMessage?: string;
    withCredentials?: boolean;
    adapter?: AxiosAdapter;
    auth?: AxiosBasicCredentials;
    responseType?: ResponseType;
    responseEncoding?: responseEncoding | string;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
    onUploadProgress?: (progressEvent: any) => void;
    onDownloadProgress?: (progressEvent: any) => void;
    maxContentLength?: number;
    validateStatus?: ((status: number) => boolean) | null;
    maxBodyLength?: number;
    maxRedirects?: number;
    socketPath?: string | null;
    httpAgent?: any;
    httpsAgent?: any;
    proxy?: AxiosProxyConfig | false;
    cancelToken?: CancelToken;
    decompress?: boolean;
    transitional?: TransitionalOptions;
    signal?: AbortSignal;
    insecureHTTPParser?: boolean;
}

interface HeadersDefaults {
    common: AxiosRequestHeaders;
    delete: AxiosRequestHeaders;
    get: AxiosRequestHeaders;
    head: AxiosRequestHeaders;
    post: AxiosRequestHeaders;
    put: AxiosRequestHeaders;
    patch: AxiosRequestHeaders;
    options?: AxiosRequestHeaders;
    purge?: AxiosRequestHeaders;
    link?: AxiosRequestHeaders;
    unlink?: AxiosRequestHeaders;
}

interface AxiosDefaults<D = any> extends Omit<AxiosRequestConfig<D>, 'headers'> {
    headers: HeadersDefaults;
}

interface AxiosResponse<T = any, D = any> {
    data: T;
    status: number;
    statusText: string;
    headers: AxiosResponseHeaders;
    config: AxiosRequestConfig<D>;
    request?: any;
}

interface AxiosError<T = any, D = any> extends Error {
    config: AxiosRequestConfig<D>;
    code?: string;
    request?: any;
    response?: AxiosResponse<T, D>;
    isAxiosError: boolean;
    toJSON: () => object;
}

type AxiosPromise<T = any> = Promise<AxiosResponse<T>>

interface CancelStatic {
    new(message?: string): Cancel;
}

interface Cancel {
    message: string | undefined;
}

interface Canceler {
    (message?: string): void;
}

interface CancelTokenStatic {
    new(executor: (cancel: Canceler) => void): CancelToken;
    source(): CancelTokenSource;
}

interface CancelToken {
    promise: Promise<Cancel>;
    reason?: Cancel;
    throwIfRequested(): void;
}

interface CancelTokenSource {
    token: CancelToken;
    cancel: Canceler;
}

interface AxiosInterceptorManager<V> {
    use<T = V>(onFulfilled?: (value: V) => T | Promise<T>, onRejected?: (error: any) => any): number;
    eject(id: number): void;
}

class Axios {
    constructor(config?: AxiosRequestConfig);
    defaults: AxiosDefaults;
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    };
    getUri(config?: AxiosRequestConfig): string;
    request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
    get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}

interface AxiosInstance extends Axios {
    (config: AxiosRequestConfig): AxiosPromise;
    (url: string, config?: AxiosRequestConfig): AxiosPromise;
}

interface AxiosStatic extends AxiosInstance {
    create(config?: AxiosRequestConfig): AxiosInstance;
    Cancel: CancelStatic;
    CancelToken: CancelTokenStatic;
    Axios: typeof Axios;
    readonly VERSION: string;
    isCancel(value: any): boolean;
    all<T>(values: Array<T | Promise<T>>): Promise<T[]>;
    spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
    isAxiosError(payload: any): payload is AxiosError;
}

// ------------- 复制来自axios -------------------

// ----------------- 复制来自axios-retry -------------------

interface IAxiosRetry {
    (
        axios: axios.AxiosStatic | axios.AxiosInstance,
        axiosRetryConfig?: IAxiosRetry.IAxiosRetryConfig
    ): void;

    isNetworkError(error: Error): boolean;
    isRetryableError(error: Error): boolean;
    isSafeRequestError(error: Error): boolean;
    isIdempotentRequestError(error: Error): boolean;
    isNetworkOrIdempotentRequestError(error: Error): boolean;
    exponentialDelay(retryNumber: number): number;
}

function isNetworkError(error: Error): boolean;
function isRetryableError(error: Error): boolean;
function isSafeRequestError(error: Error): boolean;
function isIdempotentRequestError(error: Error): boolean;
function isNetworkOrIdempotentRequestError(error: Error): boolean;
function exponentialDelay(retryNumber: number): number;

declare namespace IAxiosRetry {
    interface IAxiosRetryConfig {
        /**
         * The number of times to retry before failing
         * default: 3
         *
         * @type {number}
         */
        retries?: number,
        /**
         * Defines if the timeout should be reset between retries
         * default: false
         *
         * @type {boolean}
         */
        shouldResetTimeout?: boolean,
        /**
         * A callback to further control if a request should be retried. By default, it retries if the result did not have a response.
         * default: error => !error.response
         *
         * @type {Function}
         */
        retryCondition?: (error: axios.AxiosError) => boolean | Promise<boolean>,
        /**
         * A callback to further control the delay between retry requests. By default there is no delay.
         *
         * @type {Function}
         */
        retryDelay?: (retryCount: number, error: axios.AxiosError) => number
    }
}

declare const axiosRetry: IAxiosRetry;

type IAxiosRetryConfig = IAxiosRetry.IAxiosRetryConfig;

interface AxiosRequestConfig {
    'axios-retry'?: IAxiosRetryConfig;
}

// ----------------- 复制来自axios-retry -------------------