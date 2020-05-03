const http = require('http'),
async = require('async');
let count = 0;
let responseBody = '';
async.whilst(test,getDataFromServer,done);
function test(testCallBack){
    testCallBack(null,responseBody!=='meerkat');
}

function getDataFromServer(done){
    http.get(process.argv[2],(res)=>{
        res.setEncoding('utf-8');
        let body = '';
        res.on('data',(data)=>{
            body+=data;
        });
        res.on('end',()=>{
            count++;
            responseBody = body;
            done(null,body);
        });
        res.on('error',(err)=>{
            done(err);
        });
    }).on('error',(err)=>{
        done(err);
    });
}

function done(err,result){
    if(err) return console.error(err);
    console.log(count);
}