// grab the packages we need
var express = require('express');
var app = express();
var moment = require('moment');
var port = process.env.PORT || 8080;

app.use('/',express.static(__dirname )); 

//routes go here:
//route for the main page
app.get('/',function(req,res) {
   res.sendfile(__dirname+'/index.html');
});

function normalize (e) {
    var x = moment(new Date(e*1000)).format("MMMM DD YYYY");
    return x;
}

function makeUnix (e2) {
    var x= moment(decodeURI(e2)).format("x")/1000;
    return x.toString();
}

// route for the query
app.get('/:query', function(req, res) {
    var final = req.params.query;
    if( moment(final, 'MMMM DD YYYY').isValid()===false && isNaN(Number(final)) ) {
        res.json({unix:null, natural:null});
    } else {
        if( Number( final ) ) { 
            res.json( {unix:final, natural:normalize(final)} );
        } else {
            res.json( {unix:makeUnix(final), natural:final} );
        }
    }
});

// start the server
app.listen(port);


