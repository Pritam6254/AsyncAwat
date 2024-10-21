function download(url){
    return new Promise(function exec(res,rej){
        console.log("Started downloading data from", url);
        setTimeout(function(){
            let data = "Some data from " + url;
            console.log("Downloaded data from ",url);
            res(data);
        },3000);
    });  
}

function writeFile(data, fileName) {
    return new Promise(function exec(res,rej) {
        console.log("Writiog", data , "to file");
        setTimeout(()=> {
            console.log("Writing to file", fileName, " is done");
            let status = "Success";
            res(status);
        },2000);
    })
}

function upload(fileName, url){
    // fileName tells the name of the file to be uploaded
    return new Promise(function exec(res,rej) {
        console.log("Uploading file ",fileName, " to ", url);
        setTimeout(()=>{
            console.log("Data upload successfully");
            let uploadStatus = "Success";
            res(uploadStatus);
        },3000)
    })
}

async function exec() {
    const downloadedData = await download("https://www.example.com");
    console.log("Data downloaded is ", downloadedData);

    const fileResponse = await writeFile(downloadedData, "example.txt");
    console.log("File write status ", fileResponse);

    const uploadStatus = await upload("example.txt", "https://www.example.com");
    console.log("Upload status ",uploadStatus);


    return uploadStatus;
}

exec();