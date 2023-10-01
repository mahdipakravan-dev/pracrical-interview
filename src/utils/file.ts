export async function uploadFile(file : File, tryCount: number = 0) {
    const formData = new FormData();
    formData.append('file', file);

    // Send the file to the server using fetch
    try {
        const res = await fetch('http://82.115.20.216:1234/upload', {
            method: 'POST',
            body: formData,
        });
        return res;
    } catch (e) {
        if(tryCount++ < 3)
            return uploadFile(file, tryCount);
    }
}

/*
* Requirements :
*   1-cache image Blob after first download
*   2-get from cache in second try to download
* */
export function downloadFile(url : string) {
    return fetch(url)
}