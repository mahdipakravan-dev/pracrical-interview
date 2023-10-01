/*
* Requirements :
*
* 1- it's must handle onOpen , onClose , onError
* 2- it's must has 1 instance
*
* */

class Socket {
    private static instanse: WebSocket | null = null;
    private constructor() {
    }
    onOpen() {
        console.log('opened web socket')
    }
    static creteInstanse() : WebSocket {
        if(this.instanse) {
            return this.instanse;
        }
        this.instanse = new WebSocket('ws://82.115.20.216:1234');
        this.instanse.onopen = this.onOpen
        return this.instanse;
    }
}

export function sendRequestToWs(data : any) {
    const ws = Socket.creteInstanse();

    setTimeout(() => {
        ws.send(data)
    } , 1000)
}
