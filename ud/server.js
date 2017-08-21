var express = require('express');
var path = require('path');
app = express();
http = require('http').Server(app);

sockhttp = require('http').Server(app);
sockhttp_admin = require('http').Server(app);

io = require('socket.io')(sockhttp);
io_admin = require('socket.io')(sockhttp_admin);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

iniparser = require('iniparser');
config = iniparser.parseSync('./config.ini');

async = require('async');
redis = require('redis');
mysql = require('node-mysql');
unscore = require('underscore');
bodyParser = require('body-parser');
var session = require('express-session');
cookieParser = require('cookie-parser');
global.appRoot = path.resolve(__dirname);
cookie = require('cookie');
connect = require("connect");
//app usage ...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'secret'}));
app.use(cookieParser());

//routes
var routes = require('./routes/route')(app);

//DB Connection
var DB = mysql.DB;

redisClient = redis.createClient(config.redis_num, config.redis_host, {no_ready_check: true});
redisClient.auth(config.redis_auth);
redisClient.on('connect', function() {
    console.log('Connected to Redis');
	
	redisClient.get('game_number', function(err, game_no) {
			if(err || game_no === null) {
			    console.log('Setting game number');
				redisClient.set('game_number',1);
				redisClient.rpush("game-no-list", 1);
			}else{
				redisClient.incr('game_number');
				game_no++;
				redisClient.rpush("game-no-list", game_no);
				console.log('Set game number is ' + game_no);
			}
		});
});

pool = new DB({
	host     : config.mysql_host,    
	user     : config.mysql_username,
    password : config.mysql_password,
    database : config.mysql_db,
    port 	 : config.mysql_port,
    connectionLimit: 20
});

var game = require('./game')();

    
http.listen(config.main_port, function(){
  console.log('listening on *:'+config.main_port);
});

sockhttp.listen(config.game_port, function(){
  console.log('listening on *:'+config.game_port);
});
sockhttp_admin.listen(config.admin_port, function(){
  console.log('listening on *:'+config.admin_port);
});