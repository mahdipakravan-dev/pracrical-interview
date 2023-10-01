import { useState } from 'react';
import { downloadFile } from '../utils/file.ts';

type Props = {
    url: string;
    index: number;
};

type ImageData = {
    url: string;
    image: string;
};

const openIndexedDB = (): Promise<IDBDatabase | null> =>
    new Promise((resolve, reject) => {
        const request = window.indexedDB.open('imageDB', 1);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            const objectStore = db.createObjectStore('images', { keyPath: 'url' });
            objectStore.createIndex('url', 'url', { unique: true });
        };

        request.onsuccess = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            resolve(db);
        };

        request.onerror = () => {
            reject(null);
        };
    });

const blobToDataURL = (blob: Blob): Promise<string> =>
    new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            }
        };
        reader.readAsDataURL(blob);
});

const downloadAndStoreImage = async (url: string) => {
    try {
        const db = await openIndexedDB();
        if (!db) {
            console.error('IndexedDB is not supported in this browser.');
            return;
        }

        const response = await downloadFile(url);

        if (!response.ok) {
            throw new Error(`Failed to download image (HTTP ${response.status})`);
        }

        const blob = await response.blob();
        const image = await blobToDataURL(blob);

        const transaction = db.transaction('images', 'readwrite');
        const objectStore = transaction.objectStore('images');
        objectStore.put({ url, image });

        return image;
    } catch (error) {
        console.error('Error downloading image:', error);
    }
}

function ImageDownloader(props: Props) {
    const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

    async function handleDownloadImage() {
        try {
            const db = await openIndexedDB();
            if (!db) {
                console.error('IndexedDB is not supported in this browser.');
                return;
            }

            const transaction = db.transaction('images', 'readonly');
            const objectStore = transaction.objectStore('images');
            const request = objectStore.get(props.url);

            request.onsuccess = function (event: Event) {
                const result = (event.target as IDBRequest<ImageData>).result;
                if (result && 'image' in result) {
                    setImageSrc(result.image);
                } else {
                    // If image doesn't exist in IndexedDB, download and store it
                    downloadAndStoreImage(props.url).then(setImageSrc);
                }
            };

            request.onerror = function (event) {
                console.error('Error loading image from IndexedDB:', event.target);
            };
        } catch (error) {
            console.error('Error loading image from IndexedDB:', error);
        }
    }

    return (
        <div>
            <button onClick={handleDownloadImage}>Download Image {props.index}</button>
            {imageSrc && <img width={100} height={100} src={imageSrc} alt="Downloaded Image" />}
        </div>
    );
}

export default ImageDownloader;
