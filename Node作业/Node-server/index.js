const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const util = require('util');

const app = http.createServer();
app.on('request', (req, res) => {

  let urlWithStringQuery = url.parse(req.url, true);
  let pathname = urlWithStringQuery.pathname;
  let queryString = urlWithStringQuery.query;
  // 获取文件夹数量
  if (pathname == '/admin' && req.method.toLocaleLowerCase() == 'get') {
    // 读文件
    try {
      fs.readdir(path.join(__dirname, 'upload'), (err, files) => {
        if (err) {
          throw new Error(err.message);
          return;
        }
        let filesList = new Array();
        (function recursion(index) {
          if (index == files.length) {
            //告知浏览器upload文件夹中已经有多少个文件夹了
            res.writeHead(200, { 'Content-Type': 'application/json;Charset=utf-8' });
            res.end(JSON.stringify(filesList));
            return;
          }
          fs.stat(path.join(__dirname, 'upload', files[index]), (err, stats) => {
            if (err) {
              throw err;
            }
            if (stats.isDirectory()) {
              filesList.push(files[index]);
            }
            recursion(index + 1);
          });
        })(0);
      });
    } catch (e) {
      console.log(e);
    }
  } else if (pathname == '/admin/upload' && req.method.toLocaleLowerCase() == 'post') {
    // 上传文件到指定的文件夹中
    try {
      var form = new formidable.IncomingForm();
      // 上传文件保留扩展名
      form.keepExtensions = true;
      // 设置上传文件的存放地址
      form.uploadDir = path.join(__dirname, 'upload');
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.log(util.inspect(err));
          return;
        }
        // 根据fields找到你上传的文件夹名是什么
        console.log(util.inspect({ fields: fields, files: files }));
        // imgName fileDir 根据图片名称和地址，把文件更名并移动。
        let oldPath = files.file.path;
        let newPath = path.join(__dirname, "upload");
        if (fields.fileDir != undefined) {
          newPath += `/${fields.fileDir}`;
        }
        if (fields.imgName != undefined) {
          if (fields.imgName.indexOf('.') == -1) {
            fields.imgName += `.jpg`;
          }
          newPath += `/${fields.imgName}`;
        }
        function renameFile() {
          fs.rename(oldPath, newPath, (err) => {
            if (err) {
              console.log(util.inspect(err));
              if (err.code == 'ENOENT') {
                // 创建一个新目录
                fs.mkdir(path.join(__dirname, 'upload', fields.fileDir), err => {
                  if (err) {
                    console.log(util.inspect(err));
                    return;
                  }
                  renameFile();
                })
              }
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end('上传成功');
          })
        };
        renameFile();
      })
    } catch (e) {
      console.log(e);
    }
  } else if (pathname == '/getpicdata' && req.method.toLocaleLowerCase() == 'get') {
    // 1. 找到了用户想要看的目录
    // 2. 返回客户端图片的url
    fs.readdir(path.join(__dirname, 'upload', queryString.fileDir), function (err, files) {
      if (err) {
        console.log(err.message);
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(files));
    })
  } else if (pathname == '/static' && req.method.toLocaleLowerCase() == 'get') {
    // 获取用户图片的访问url
    fs.readFile(path.join(__dirname, 'upload', queryString.fileDir, queryString.fileName), (err, data) => {
      if (err) {
        console.log(err.message);
        return;
      }
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(data);
    })
  } else {
    res.writeHead(404);
    res.end();
  }
});
app.listen(3000,'192.168.31.43');