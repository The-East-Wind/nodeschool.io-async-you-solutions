const http = require('http'),
async = require('async');

async.each(process.argv.slice(2),getDataFromServer,getErrors);
function getDataFromServer(url,done){
    http.get(url,(res)=>{
        res.on('data',(data)=>{});
        res.on('end',()=>{
            done(null);
        });
        res.on('error',(err)=>{
            done(err);
        });
    }).on('error',(err)=>{
        done(err);
    });
}
function getErrors(err){
    if(err) console.error(err);
}