
export interface MsgEntity {
    title?: string
    content?: string
    // 消息类型,默认text
    type?: string
    // 平台相关的参数
    param?: { [key: string]: any }
}


export class PushResult {
    protected msg = "";
    protected _code = 0;
    constructor(code: number, msg: string) {
        this._code = code;
        this.msg = msg;
    }

    public isSuccess(): boolean {
        return !this._code;
    }

    public code(): number {
        return this._code;
    }

    public error(): string {
        return this.msg;
    }
}

export const ErrNetwork = new PushResult(-1, "network error");
export const PushSuccess = new PushResult(0, "");
