import {ErrNetwork, MsgEntity, PushResult, PushSuccess} from "./model";
import {MsgPlatform} from "./platform";

export class Telegram implements MsgPlatform {
    protected token = "";
    protected chat_id = "";

    constructor(chat_id: string, token: string) {
        this.chat_id = chat_id;
        this.token = token;
    }

    pushMsg(entity: MsgEntity): Promise<PushResult> {
        return new Promise(resolve => {
            let url = "https://api.telegram.org/bot" + this.token + "/sendMessage"
            let data = "chat_id=" + this.chat_id + "&parse_mode=" + entity.type + "&text=";
            data += encodeURIComponent(entity.content!);
            GM_xmlhttpRequest({
                url: url,
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data,
                onload(xhr) {
                    if (xhr.response.ok) {
                        resolve(PushSuccess);
                    } else {
                        resolve(new PushResult(xhr.response.error_code, xhr.response.description))
                    }
                },
                onerror() {
                    resolve(ErrNetwork);
                }
            })

        });
    }

    platform(): string {
        return "Telegram"
    }

}
