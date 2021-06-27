import { MsgEntity, PushResult } from "./model";

export interface MsgPlatform {
    pushMsg(entity: MsgEntity): Promise<PushResult>;
    platform(): string
}


export class MsgCenter {

    protected platforms: MsgPlatform[] = [];

    constructor(platforms: MsgPlatform[]) {
        this.platforms = platforms;
    }

    public pushMsg(entity: MsgEntity): Promise<{ [key: string]: PushResult }> {
        return new Promise(resolve => {
            let ret: { [key: string]: PushResult } = {};
            let i = 0;
            this.platforms.forEach(async val => {
                let result = await val.pushMsg(entity);
                i++;
                ret[val.platform()] = result;
                if (i == this.platforms.length) {
                    resolve(ret);
                }
            });
            this.platforms.length || resolve(ret);
        })
    }

}