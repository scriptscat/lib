import { postJson } from "@App/utils/utils";
import { MsgEntity, PushResult, PushSuccess, ErrNetwork } from "./model";
import { MsgPlatform } from "./platform";

export class Wechat implements MsgPlatform {

    protected key = "";

    constructor(key: string) {
        this.key = key;
    }

    pushMsg(entity: MsgEntity): Promise<PushResult> {
        return new Promise(resolve => {
            let param = (entity.param && entity.param[this.platform()]) || {};
            let type = param.type || entity.type;
            let req: any = { msgtype: type };
            switch (type) {
                default:
                case 'text':
                    req.text = param.text || {};
                    req.text.content = req.text.content || entity.content;
                    break;
                case 'markdown':
                    req.markdown = param.markdown;
                    break;
                case 'image':
                    req.image = param.image;
                    break;
                case 'news':
                    req.news = param.news;
                    break;
                case 'file':
                    return resolve(new PushResult(-2, "wechat file not supported"));
            }
            let url = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=" + this.key;
            postJson(url, req, (resp) => {
                if (resp.response.errcode) {
                    resolve(new PushResult(resp.response.errcode, resp.response.errmsg));
                } else {
                    resolve(PushSuccess);
                }
            }, () => {
                resolve(ErrNetwork);
            });
        });
    }

    platform(): string {
        return "wechat";
    }

}
