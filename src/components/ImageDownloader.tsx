import React, { useState } from 'react';
import {downloadFile} from "../utils/file.ts";

type Props = {
    url : string
    index : number
}
function ImageDownloader(props : Props) {
    const [imageSrc, setImageSrc] = useState('');

    const handleDownloadImage = async () => {
        try {
            const response = await downloadFile(props.url)

            if (!response.ok) {
                throw new Error(`Failed to download image (HTTP ${response.status})`);
            }

            return response;
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    return (
        <div>
            <button onClick={handleDownloadImage}>Download Image {props.index}</button>
            {imageSrc && <img width={100} height={100} src={imageSrc} alt="Downloaded Image" />}
        </div>
    );
}

export default ImageDownloader;
