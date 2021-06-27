import {postJson} from "@App/utils/utils";
import {ErrNetwork, MsgEntity, PushResult, PushSuccess} from "./model";
import {MsgPlatform} from "./platform";

export class PushPlus implements MsgPlatform {
    protected token = "";
    protected channel = "";
    protected configCode = "";

    constructor(channel: string, token: string, configCode?: string) {
        this.token = token;
        this.channel = channel;
        this.configCode = configCode || '';
    }

    pushMsg(entity: MsgEntity): Promise<PushResult> {
        return new Promise(resolve => {
            postJson("http://www.pushplus.plus/send", {
                token: this.token, title: entity.title, content: entity.content,
                template: entity.type, channel: this.channel, webhook: this.configCode
            }, (xhr) => {
                if (xhr.response.code !== 200) {
                    resolve(new PushResult(xhr.response.code, xhr.response.msg))
                } else {
                    resolve(PushSuccess)
                }
            }, () => {
                resolve(ErrNetwork)
            })
        });
    }

    platform(): string {
        return "PushPlus"
    }

}
