const http = require('http');
const formidable = require('formidable');
const fs = require('fs');

const FILES_DESTINATION = './uploaded-files/';
const PORT = 8080;

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      try {
        const file = Object.values(files)[0];
        const fileName = FILES_DESTINATION + file.name;
        fs.rename(file.path, fileName, (err) => {
          if (err) throw err;
          console.log('Uploaded ' + fileName);
          res.write('File uploaded');
          res.end();
        });
      } catch(err) {
        console.log(err);
      }
 });
  } else {
    res.writeHead(400);
    return res.end();
  }
}).listen(PORT);