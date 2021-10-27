
declare namespace gm {

    interface AjaxInstanceConfig extends AjaxRequestConfig {
        baseUrl?: string
    }

    interface AjaxRequestConfig {
        method?: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS"
        url?: string
        headers?: { [key: string]: string | string[] }
        data?: any
        cookie?: string
        timeout?: number
        responseType?: "arraybuffer" | "blob" | "json"
        overrideMimeType?: string
        anonymous?: boolean
        nocache?: boolean
        // 校验状态码是否成功,默认 status >= 200 && status < 300
        validateStatus?: ((status: number) => boolean) | null;
    }

    interface AjaxResponse<T = any> {
        data: T;
        status: number;
        statusText: string;
        headers: any;
        config: AjaxRequestConfig;
    }

    interface AjaxPromise<T = any> extends Promise<AjaxResponse<T>> {
    }

    interface AjaxInstance {
        (config: AjaxRequestConfig): AjaxPromise;
        (url: string, config?: AjaxRequestConfig): AjaxPromise;
        request(config: AjaxRequestConfig): AjaxPromise;
        get(url: string, config?: AjaxRequestConfig): AjaxPromise;
        delete(url: string, config?: AjaxRequestConfig): AjaxPromise;
        head(url: string, config?: AjaxRequestConfig): AjaxPromise;
        options(url: string, config?: AjaxRequestConfig): AjaxPromise;
        post(url: string, data?: any, config?: AjaxRequestConfig): AjaxPromise;
        put(url: string, data?: any, config?: AjaxRequestConfig): AjaxPromise;
        patch(url: string, data?: any, config?: AjaxRequestConfig): AjaxPromise;
    }

    export interface ajax extends AjaxInstance {
        create(config?: AjaxInstanceConfig): AjaxInstance;
    }

    interface NotificationConfig {

    }

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

    export function notification(title: string, content: string, details?: NotificationDetails): Promise<NotificationInstance>;

}