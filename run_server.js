var http = require('http');
var url = require('url');var sprintf = require("sprintf-js").sprintf,
    vsprintf = require("sprintf-js").vsprintf;
var request = require('request');
var Iconv  = require('iconv').Iconv;
var ic8859 = new Iconv('ISO-8859-1','UTF-8');
var port = 8000;

var item_url="http://fddb.info/api/v8/item/id_%s.xml?apikey=HREPF3HUMKOUKKZTAK647"
var search_url="http://fddb.info/api/v8/search/item.xml?lang=de&q=%s&apikey=HREPF3HUMKOUKKZTAK647"

http.createServer(function(proxyReq, proxyResp) {
    var params = url.parse(proxyReq.url, true);
    var method=params.query.method;
    var param=params.query.param
    console.log(method);

    var URL="";
    if(method=="search"){
        console.log("search")
        console.log(sprintf(search_url,param));
        URL=sprintf(search_url,param);
    }else if(method=="item"){
        console.log("item")
        URL=sprintf(item_url,param)
    }


    request({url:URL,encoding:"binary"}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var headers = response.headers;
        headers['Access-Control-Allow-Origin'] = '*';
        headers['Access-Control-Allow-Headers'] = 'X-Requested-With';
        proxyResp.writeHead(200, headers);
        //console.log(ic8859.convert(body)) // Print the google web page.
          proxyResp.write(body);
          proxyResp.end();
      }
      else{
        proxyResp.writeHead(503);
        proxyResp.write("Error!");
        proxyResp.end();
      }
    })

   // var URL = "http://" + params.query.src;
/*
    var destParams = url.parse(URL);

    var reqOptions = {
        host : destParams.host,
        port : 80,
        path : destParams.pathname,
        method : "GET"
    };

    var req = http.request(reqOptions, function(res) {
        var headers = res.headers;
        headers['Access-Control-Allow-Origin'] = '*';
        headers['Access-Control-Allow-Headers'] = 'X-Requested-With';
        proxyResp.writeHead(200, headers);

        res.on('data', function(chunk) {
            proxyResp.write(chunk);
        });

        res.on('end', function() {
            proxyResp.end();
        });
    });

    req.on('error', function(e) {
        console.log('An error occured: ' + e.message);
        proxyResp.writeHead(503);
        proxyResp.write("Error!");
        proxyResp.end();
    });
    req.end();*/

}).listen(port);