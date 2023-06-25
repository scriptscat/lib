import { gm } from "@App/types/gm";

export function notification(
  title: string,
  content: string,
  details?: gm.NotificationDetails
): Promise<gm.NotificationInstance> {
  return new Promise((resolve) => {
    let ret: any = {
      update(details: gm.NotificationDetails) {
        GM_updateNotification(ret.id, details);
      },
      close() {
        GM_closeNotification(ret.id);
      },
      done(callback: () => void) {
        ret.ondone = callback;
      },
      click(callback: () => void) {
        ret.onclick = callback;
      },
    };
    let d = <gm.NotificationDetails>Object.assign({}, details);
    d.title = title;
    d.text = content;
    d.oncreate = (id: string) => {
      ret.id = id;
      resolve(ret);
    };
    d.ondone = (clicked: boolean, id: number) => {
      ret.ondone && ret.ondone(clicked, id);
    };
    d.onclick = (id: number, index: number) => {
      ret.onclick && ret.onclick(id, index);
    };
    GM_notification(d);
  });
}
