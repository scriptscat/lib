import { DingTalk } from "./dingtalk";
import { MsgCenter } from "./platform";


(<any>window).MsgCenter = MsgCenter;
(<any>window).DingTalk = DingTalk;
