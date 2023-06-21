import { encode } from "base64-arraybuffer";

export function postJson(
  url: string,
  data: any,
  success: GMTypes.Listener<GMTypes.XHRResponse>,
  error: () => void
) {
  GM_xmlhttpRequest({
    url: url,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
    onload: success,
    onerror: error,
  });
}

export function imageUrlToBase64(url: string): Promise<string> {
  return new Promise((resolve) => {
    GM_xmlhttpRequest({
      url: url,
      responseType: "arraybuffer",
      onload(xhr) {
        let contentType = "image/png";
        if (xhr.responseHeaders) {
          let headers = xhr.responseHeaders.toLowerCase();
          let pos = headers.indexOf("content-type");
          if (pos !== -1) {
            let lastPos = headers.indexOf("\n", pos);
            if (lastPos !== -1) {
              pos += 13;
              contentType = headers
                .substr(pos, lastPos - pos)
                .split(";")[0]
                .trim();
            }
          }
        }
        resolve(
          "data:" +
            contentType +
            ";base64," +
            encode(xhr.response as ArrayBuffer)
        );
      },
      onerror() {
        resolve("");
      },
    });
  });
}
