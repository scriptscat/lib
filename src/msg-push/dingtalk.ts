import { postJson } from "@App/utils/utils";
import { ErrNetwork, MsgEntity, PushResult, PushSuccess } from "./model";
import { MsgPlatform } from "./platform";
import crypto from "crypto";

export class DingTalk implements MsgPlatform {
    protected token = "";
    protected secret = "";

    constructor(token: string, secret: string) {
        this.token = token;
        this.secret = secret;
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
                case 'link':
                    req.link = param.link;
                    break;
                case 'actionCard':
                    req.actionCard = param.actionCard;
                    break;
                case 'feedCard':
                    req.feedCard = param.feedCard;
                    break;
            }
            let url = "https://oapi.dingtalk.com/robot/send?access_token=" + this.token;
            if (this.secret) {
                let time = new Date().getTime();
                let sign = time + "\n" + this.secret;
                url += "&timestamp=" + time + "&sign=" + encodeURIComponent(crypto.createHmac('sha256', this.secret).update(sign).digest().toString('base64'));
            }
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
        return "DingTalk"
    }

}
