/*
* Requirements :
*
* 1- it's must handle onOpen , onClose , onError
* 2- it's must has 1 instance
*
* */
export function sendRequestToWs(data : any) {
    const ws = new WebSocket('ws://82.115.20.216:1234');

    setTimeout(() => {
        ws.send(data)
    } , 1000)
}
