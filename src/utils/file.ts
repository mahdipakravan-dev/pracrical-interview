export function uploadFile(file : File) {
    const formData = new FormData();
    formData.append('file', file);

    // Send the file to the server using fetch
    return fetch('http://82.115.20.216:1234/upload', {
        method: 'POST',
        body: formData,
    });
}

/*
* Requirements :
*   1-cache image Blob after first download
*   2-get from cache in second try to download
* */
export function downloadFile(url : string) {
    return fetch(url)
}