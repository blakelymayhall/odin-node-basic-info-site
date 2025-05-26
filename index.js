var http = require("http");
var url = require("url");
var fs = require("fs");

http.createServer((req, res) => {
    const err_fn = "./404.html";

    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;

    fs.readFile(filename, (err, data) => {
        if (err) {
            fs.readFile(err_fn, (err404, err_data) => {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.write(err404 ? "404 Not Found" : err_data);
                return res.end();
            });
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            return res.end();
        }
    });
}).listen(8080);
