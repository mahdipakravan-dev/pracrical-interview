import './App.css'
import {sendRequestToWs} from "./utils/socket.ts";
import {useState} from "react";
import {sendMessage} from "./utils/message.ts";
import {downloadFile} from "./utils/file.ts";
import ImageDownloader from "./components/ImageDownloader.tsx";

enum Practices {
    Websocket = "Web_Socket",
    SendMessage = "Send_Message",
    DownloadImage = "Download_Image",
}

const imagesUrl = [
    "https://dkstatics-public.digikala.com/digikala-products/06aaa82b2af4b71992683701769b0afa4fa169bf_1666160815.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80",
    "https://dkstatics-public.digikala.com/digikala-adservice-banners/cf4b08e19e315727c032a055b7560dd98ab228f8_1695812516.jpg?x-oss-process=image/quality,q_95",
    "https://dkstatics-public.digikala.com/digikala-adservice-banners/0c20d3c67902207de3075c9629ddc88f455d5f2a_1696061150.jpg?x-oss-process=image/quality,q_95"
]

function App() {

  const [practiceId , setPracticeId] = useState<Practices>(Practices.Websocket);

  const WebSocketPractice = () => {
      return (
          <>
              <h1>Websocket Practice</h1>
              <div className="card">
                  <button onClick={() => sendRequestToWs("Salam")}>
                      Send Request
                  </button>
              </div>
          </>
      )
  }

  const SendMessage = () => {
      return (
          <>
              <h1>Send Message Practice</h1>

              <div className="card">
                  <button onClick={() => {
                      (async () => {
                          // @ts-ignore
                          let [file] = await window.showOpenFilePicker();
                          file = await file.getFile()
                          sendMessage("MessageWithFile" , file , false)
                      })()
                  }}>
                      Send Message With Attachment 📁
                  </button>
                  <br/>
                  <button onClick={() => {
                      (async () => {
                          // @ts-ignore
                          let [file] = await window.showOpenFilePicker();
                          file = await file.getFile()
                          sendMessage("MessageWithMusic" , file , true)
                      })()
                  }}>
                      Send Message With Music 🎧
                  </button>
                  <br/>
                  <button onClick={() => {
                      sendMessage("MessageWithFile")
                  }}>
                      Send Message
                  </button>
              </div>
          </>
      )
  }

  const DownloadImage = () => {
      return (
          <>
            <h1>Download Image Practice : </h1>

              {imagesUrl.map((url , index) => (
                  <ImageDownloader url={url} index={index}/>
              ))}
          </>
      )
  }
  return (
    <>
        {Object.values(Practices).map(practice =>
            <button
                onClick={() => {
                    setPracticeId(practice)
                }}
                style={{marginRight : 10 , background : practice === practiceId ? "rgba(255,255,255,.3)" : "rgba(0,0,0,.5)"}}>
                    {practice}
            </button>
        )}
        <hr/>
        {practiceId === Practices.Websocket && <WebSocketPractice/>}
        {practiceId === Practices.SendMessage && <SendMessage/>}
        {practiceId === Practices.DownloadImage && <DownloadImage/>}
    </>
  )
}

export default App
