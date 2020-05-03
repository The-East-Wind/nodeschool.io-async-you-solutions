const http = require('http'),
async = require('async');

async.reduce(['one','two','three'],0,getDataFromServer,done);

function done(err,result){
    if(err) return console.error(err);
    console.log(result);
}

function getDataFromServer(acc,item,done){
    http.get(process.argv[2]+'?number='+item,(res)=>{
        res.setEncoding('utf-8');
        let body = '';
        res.on('error',(err)=>{
            done(err);
        }); 
        res.on('data',(data)=>{
            body+=data;
        });
        res.on('end',()=>{
            done(null,acc+Number(body));
        });
    }).on('error',(err)=>{
        done(err);
    }); 
}