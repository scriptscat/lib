declare function postJson(url: string, data: any, success: (GM_Types.Listener<GM_Types.XHRResponse>), error: () => void);

declare function imageUrlToBase64(url: string): Promise<string>;
