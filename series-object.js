const http = require('http'),
async = require('async');
async.series({
    requestOne: (done)=>{getDataFromServer(process.argv[2],done)},
    requestTwo: (done)=>{getDataFromServer(process.argv[3],done)}
},getResults);
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
function getResults(err,result){
    if(err) return console.error(err);
    console.log(result);
}