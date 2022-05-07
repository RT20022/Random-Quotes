const http = require("http")
const request = require("requests")
const fs = require("fs")
const htmldata = fs.readFileSync("index.html","utf-8")
const replacevalue =  (oldval,orgval)=> {
   temp =  oldval.replace("{%qq%}",orgval.q);
   temp = temp.replace("{%Author%}",orgval.a);
   return temp;
}

const server = http.createServer((req,resp) =>{

    // resp.writeHead(200, {
    //     'Content-Type': 'text/html'
    // });

        

    
     if (req.url == "/") {
          request("https://zenquotes.io/api/today").on('data',(chunk)=>{
              const objdata = JSON.parse(chunk);
              const arrdata = objdata;
              const mapdata = arrdata.map((ab)=> replacevalue(htmldata,ab)).join("");
              console.log(mapdata);
        //  const myd =   Buffer.from(mapdata);
        //  resp.write(myd)
        resp.write(mapdata)
          })
          .on("end",(err)=>{
              console.log(err)
              resp.end()
          })
     }
})

server.listen(7800)
console.log("R")