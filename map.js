const http = require('http'),
async = require('async');

async.map(process.argv.slice(2),getDataFromServer,getResults);
function getDataFromServer(url,done){
    http.get(url,(res)=>{
        res.setEncoding('utf-8');
        let body = '';
        res.on('data',(data)=>{
            body+=data;
        });
        res.on('end',()=>{
            done(null,body);
        });
        res.on('error',(err)=>{
            done(err);
        });
    }).on('error',(err)=>{
        done(err);
    });
}
function getResults(err,results){
    if(err) return console.error(err);
    console.log(results);
}