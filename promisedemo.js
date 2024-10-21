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

function* exec() {
    const downloadedData = yield download("https://www.example.com");
    console.log("Data downloaded is ", downloadedData);

    const fileResponse = yield writeFile(downloadedData, "example.txt");
    console.log("File write status ", fileResponse);

    const uploadStatus = yield upload("example.txt", "https://www.example.com");
    console.log("Upload status ",uploadStatus);


    return uploadStatus;
}

const it = exec(); // exec function will return us an gen object having an iterator

const ft = it.next();
console.log("ft is ",ft);
ft.value.then(function doAfterReceiving(value) {
    console.log("Calling do after receiving when download is finished", value);

   const future = it.next(value); // interesting
   
   if(future.done) return;

   future.value.then(doAfterReceiving);
});