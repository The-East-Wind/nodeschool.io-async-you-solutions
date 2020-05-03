const http = require('http'),
async = require('async'),
fs = require('fs');
async.waterfall([readFromFile,getDataFromServer],getResult);
function readFromFile(done){
    fs.readFile(process.argv[2],'utf-8',(err,data)=>{
        if(err) return done(err);
        done(null,data);
    });
}
function getDataFromServer(url,done){
    http.get(url,(res)=>{
        let body = '';
        res.setEncoding('utf-8')
        res.on('data',(data)=>{
            body+=data;
        });
        res.on('end',()=>{
            done(null,body);
        });
        res.on('error',(err)=>{
            done(err);
        })
    }).on('error',(err)=>{
        done(err);
    });
}
function getResult(err,result){
    if(err) return console.error(err);
    console.log(result);
}