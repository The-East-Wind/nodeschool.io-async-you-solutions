const http = require('http'),
async = require('async');

async.series({postData: postData,getData: getData},getResult);
function getResult(err,result){
    if(err) return console.error(err);
    console.log(result.getData);
}

function getData(done){
    let url = 'http://'+process.argv[2]+':'+process.argv[3]+'/users';
    http.get(url,(res)=>{
        let body = '';
        res.setEncoding('utf-8');
        res.on('data',(data)=>{
            body+=data;
        });
        res.on('error',done);
        res.on('end',()=>{
            done(null,body);
        });
    }).on('error',done);
}

function postData(done){
    async.times(5,postDataToServer,(err,response)=>{
        if(err) return done(null);
        done(null);
    });
}

function postDataToServer(userId,donePost){
    let options = {
        'hostname': process.argv[2],
        'port': process.argv[3],
        'method': 'POST',
        'path': '/users/create'
    };
    let req = http.request(options,(res)=>{
        res.on('error',donePost);
        res.on('data',(data)=>{

        });
        res.on('end',()=>{
            donePost(null,null);
        });
    }).on('error',donePost);
    req.write(JSON.stringify({"user_id": userId+1}));
    req.end();
}