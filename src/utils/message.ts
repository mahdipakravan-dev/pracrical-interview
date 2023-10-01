import {sendRequestToWs} from "./socket.ts";
import {uploadFile} from "./file.ts";

/*
* Requirements :
*
* 1-give a best-practice for sendMessage function
* 2-give a best-practice for when it's need to retry
* */
function mssleep(time : number = 1000) {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        } , time)
    })
}
export function sendMessage(message : string , attachment ?: File , isMusic ?: boolean) {
    if(!attachment) {
        sendRequestToWs(message);
        return
    }
    if(attachment) {
        (async () => {
            if(isMusic) {
                await mssleep();
            }

            const uploadResponse = await uploadFile(attachment)
            if(uploadResponse.ok) {
                sendRequestToWs({
                    attachmentId : Math.random().toFixed().toString()
                })
            } else {
                const upload2 = await uploadFile(attachment)
                if(upload2) {
                    sendRequestToWs({
                        attachmentId : Math.random().toFixed().toString()
                    })
                }
            }

        })()
    }
}