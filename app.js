var express = require('express');
var app = express();
var faker = require('faker');
var Nedb = require('nedb');

var db = new Nedb({ filename: 'db/data.db', autoload:true }); //instantiate nedb

var router = express.Router();              // get an instance of the express Router

app.get('/', function(req, res) {
    res.sendFile('/site/index.html', { root: __dirname });
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get('/api', function(req, res) {  
    // wipe data from db if any
    db.remove({},{ multi: true });
    // create new data using faker
    for (var i=0; i <= 20; i++)
    {
    	var randomName = faker.name.findName();
    	var randomEmail = faker.internet.email();
    	var randomAvatar = faker.internet.avatar();
    	var randomCompany = faker.company.companyName();
    	var randomDate = faker.date.recent();
    	//save to db
    	db.insert(
    	{
    		name: randomName,
    		email: randomEmail,
    		avatar: randomAvatar,
    		company: randomCompany,
    		date: randomDate
    	}, function(err) {
    		console.log("Inserting record " + i);
    	});   	
    }
    console.log("Data inserted into db");
    //get data from db
    db.find({}, function (err, docs) {
    	//return as json
    	res.json(docs);
	});
    console.log("Check browser for data");
});


app.use(express.static(__dirname + '/site'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Head over to http://localhost:3000");
});