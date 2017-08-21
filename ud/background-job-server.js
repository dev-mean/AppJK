var express = require('express');
var path = require('path');
app = express();
http = require('http').Server(app);
async = require('async');
redis = require('redis');
mysql = require('node-mysql');
unscore = require('underscore');
connect = require("connect");
//DB Connection
var DB = mysql.DB;
pool = new DB({
	host     : 'localhost',    
	user     : 'root',
    password : '',
    database : 'r',
    // port : '3306',
    connectionLimit: 20
});
var calculation_logic = require('./calculation_logic');

 var insert_transaction_query = 'insert into  bet_transaction SET ? ';

redisClient = redis.createClient(19554, 'pub-redis-19554.us-east-1-2.4.ec2.garantiadata.com', {no_ready_check: true});
redisClient.auth('getlost123');
redisClient.on('connect', function() {
    console.log('Connected to Redis');
});

var calling_interval = 5000;
var transferDataTimer = setInterval(function(){ transferDataFromRedisToMySql() }, calling_interval);
var count= 0;
function transferDataFromRedisToMySql() {
	// halt it till next is not finished...
	count++;
	console.log('It is called ' + count + ' times. ');
	haltNextDataTransferCall(transferDataTimer);
			lrangeFxn();
	transferDataTimer = setInterval(function(){ transferDataFromRedisToMySql() }, calling_interval);
}

function lrangeFxn(){
	redisClient.lrange("game-no-list", 0, 0, function(err, game_number) {
		if(!err){console.log('Processing - ' + game_number);
		redisClient.get('game_number', function(err, game_num) {
			if(game_num != game_number)
				transferData(game_number);
			else
				console.log('Game ' + game_number + ' is still not complete' );
			});
		}
	});
}

function transferData(game_num){
var game_user = 'game' + game_num + 'userbets';
var game_magic_key = 'game' + game_num + 'magic';
console.log(game_user);
redisClient.hgetall(game_user, function(err, object) {
			if( object == null){
				console.log('No Bets To insert');
				lpop();
			}
			else{
				redisClient.hkeys(game_user, function (err, replies) {
					async.forEachLimit(replies, 2, function (reply, calbk) {
						redisClient.get(game_magic_key, function(err, magic_number) {
							console.log(reply + ' has betted ' + object[reply]);
							var betOut = calculation_logic.betOutput(object[reply], magic_number);
							insertIntoDatabase( game_num, reply, object[reply],magic_number, betOut);
							 calbk();
								});
							//console.log(object[reply]);
						}, function(err) {	
						});
					});
				}
   		});
}

function insertIntoDatabase(game_num, user_id, bet_string, magic_number, betOut){

     var bet_amount = betOut.totalBet;
	 var final_amount = betOut.finalAmmount;
	 var profit_loss = betOut.profit;
	var insertData = " ( '" + user_id + "' , '" + game_num + "','" + bet_amount + "' , '" + final_amount + "' , '" + profit_loss + "' , '" + bet_string + "' ) ";
	 insertData = {user_id:user_id, game_id:game_num, bet_amount:bet_amount, final_amount:final_amount, profit_loss:profit_loss, bet_string:bet_string, magic_no:magic_number};
	
	console.log(insert_transaction_query + insertData );
	pool.getConnection(function(err,connection){
				if (err) {
					// TODO Handle carefully
					console.log('Cannot get connection from the Pool ' + err);
					//res.json({"code" : 100, "status" : "Error in connection database"});
					return;
					}
					connection.query(insert_transaction_query, insertData, function(e,rows){
				connection.commit(function(errw) {
						if(!errw){
							var game_user = 'game' + game_num + 'userbets';
							var game_magic_key = 'game' + game_num + 'magic';
							redisClient.del(game_magic_key);
							redisClient.del(game_user);
							lpop();
							}
						connection.release();
					});
				});
			});
}


function lpop(){
    redisClient.lpop("game-no-list" , function(errr, poped){
		console.log('Removed : ' + poped);						
		//redisClient.lrem('testing-list', 12,last_magic_numbers_list);
    });
}

function lengthOfList(){
redisClient.llen("game-no-list" , function(errrr, outLength){
							console.log('Length After Removal '  + outLength);
});
}

function haltNextDataTransferCall() {
  clearInterval(transferDataTimer);
}

    
http.listen(4000, function(){
  console.log('listening on *:3000');
});