const http = require("node:http");
const fs = require("node:fs");

const server = fs.createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"text/html"});
    const html = fs.readFileSync("./index.html","utf-8");
    res.end(html)
})

server.listen(3000, ()=>{
    console.log("Serv Running en port 3000");
})