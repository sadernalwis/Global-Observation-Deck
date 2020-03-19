//npm install express body-parser cors express-fileupload morgan lodash --save
const https = require('https')
const Tm = require('./text/javascript/T');
const fs = require('fs');
const express = require('express');
const expressip = require('express-ip');
const query = require('url');

const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();
app.use(expressip().getIpInfoMiddleware);

// const hostname = '173.82.173.9';
// const xyztem = "/ruby/xyztem/net";
const hostname = '192.168.1.7';
// const hostname = '192.168.43.103';
// const hostname = 'localhost';
const xyztem = "/home/sadern/Documents/ruby";
const port = 443;


var hash = 0;
var map = new Map();


// app.use(fileUpload({
//     createParentPath: true
// }));
app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 200 * 1024 * 1024 * 1024 //200MB max file(s) size
    },
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(morgan('dev'));

//start app 
//const port = process.env.PORT || 3000;
app.post('/Ruby/xyztem', async(req, res) => {

    console.log(`incoming files from ${"ip"}`);
    try {
        if (!req.files) {

            console.log(`nofiles from ${"ip"}`);
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files;
            console.log(`files from ${typeof avatar}`);


            for (var key in avatar) {
                console.log(key, avatar[key]);
                avatar[key].mv('/ruby/xyztem/uploads/' + key);

            }
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            //avatar.mv('./uploads/' + avatar.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.use((req, res) => {
    var url = req.url.split('/');
    let ipInfo = req.ipInfo;
    let location = ipInfo.city + ", " + ipInfo.country;

    if (req.files) {
        try {

            console.log(`incoming files from ${ip}`);
            let data = [];

            //loop all files
            _.forEach(_.keysIn(req.files.photos), (key) => {
                let photo = req.files.photos[key];

                //move photo to uploads directory
                photo.mv('./uploads/' + photo.name);

                //push file details
                data.push({
                    name: photo.name,
                    mimetype: photo.mimetype,
                    size: photo.size
                });
            });

            //return response
            res.send({
                status: true,
                message: 'Files are uploaded',
                data: data
            });
        } catch (error) {
            res.status(500).send(error);
        }

    } else if (url[1] === "") {

        var v = { ceo: "janice", coo: "imran", cto: "sadern" };
        for (var key in v) {
            // console.log(key, v[key]);
        }

        var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;


        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.write("<!DOCTYPE html>");
        res.write("<html>");
        res.write("<head>");
        res.write(`<title>${location}</title>`);
        res.write('<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">');

        res.write(`<link href="https://${hostname}:${port}/text/css/main.css" rel="stylesheet" type="text/css" />`);


        res.write(`<script type="module" src="https://${hostname}:${port}/text/javascript/ui/ui.js"></script>`);
        res.write(`<script type="module" src="https://${hostname}:${port}/text/javascript/main.js"></script>`);
        res.write(`<script type="text/javascript" src="https://${hostname}:${port}/text/javascript/qr/qrcode.js"></script>`);
        res.write(`<script async src="https://${hostname}:${port}/text/javascript/opencv/opencv.js" type="text/javascript"></script>`);
        hash++;
        res.write(`<script type="text/javascript">
            const hash = "${ip}"; 
        </script>`);

        res.write("</head>");
        res.write(`<body  style="touch-action:none;">`);

        let path = xyztem + "/text/html/body.html";
        fs.readFile(path, function(err, data) {
            if (err) {
                console.error(`error on ${path} + ${err}`);
            } else {
                res.write(data.toString());
                res.write("</body>");
                res.write("</html>");
            }
            res.end();
        });
        console.log(`end incoming request ${ip}`);


    } else {

        let path = xyztem + url.join('/');
        if (url[1] === "favicon.ico") {
            fs.readFile(`${xyztem}/favicon.ico`, function(err, data) {
                if (err) {
                    console.error(`error on favicon`);
                } else {
                    res.writeHead(200, { 'Content-Type': `image/ico` });
                    res.write(data);
                }
                res.end();
            });

        } else if (url[1] === "map") {
            var offset = 3;
            var parameter = query.parse(req.url, true).query;
            //parameter.asset_name = "Soldier.glb";
            parameter.asset_name = "ruby_node.glb";
            // parameter.asset_name = "rubynode.glb";
            parameter.mesh_Name = "vanguard_Mesh";

            map.set(parameter.e, parameter);
            var parameters = Array.from(map.values());

            res.json(JSON.stringify(parameters));
            res.end();

        } else if (url[1] === "icon") {
            var directory = "/image/svg+xml";
            res.json(JSON.stringify(
                fs.readdirSync(xyztem + directory).map(
                    node => {
                        if (node.endsWith(".svg")) {
                            return `https://${hostname}:${port}${directory}/${node}`;
                        }
                    }
                )));
            res.end();

        } else if (url[1] !== "socket.io") {
            fs.readFile(path, function(err, data) {
                if (err) {
                    console.error(`error on ${path} + ${err} ${url.length}`);
                } else {
                    res.writeHead(200, { 'Content-Type': `${url[1]}/${url[2]}` });
                    res.write(data);
                }
                res.end();
            });
        }


    }
});

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app).listen(port, hostname, () => {
    console.log(`Listening on https://${hostname}:${port}/`);
});