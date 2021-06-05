interface MsgEntity {
    title?: string;
    content?: string;
    type?: string;
    param?: {
        [key: string]: any;
    };
}

declare class PushResult {
    protected msg: string;
    protected _code: number;
    constructor(code: number, msg: string);
    isSuccess(): boolean;
    code(): number;
    error(): string;
}

declare const ErrNetWork: PushResult;

declare const PushSuccess: PushResult;

interface MsgPlatform {
    pushMsg(entity: MsgEntity): Promise<PushResult>;
    platform(): string;
}

declare class MsgCenter {
    platforms: MsgPlatform[];
    constructor(platforms: MsgPlatform[]);
    pushMsg(entity: MsgEntity): Promise<PushResult>;
}

// 钉钉机器人文档:https://developers.dingtalk.com/document/app/custom-robot-access
declare class DingTalk implements MsgPlatform {
    constructor(url: string, secret: string);
    pushMsg(entity: MsgEntity): Promise<PushResult>;
    platform(): string;
}

// 企业微信机器人文档:https://work.weixin.qq.com/api/doc/90000/90136/91770
declare class Wechat implements MsgPlatform {
    constructor(key: string);
    pushMsg(entity: MsgEntity): Promise<PushResult>;
    platform(): string;
}
