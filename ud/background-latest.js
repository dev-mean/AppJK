var express = require('express');
var path = require('path');
app = express();
http = require('http').Server(app);
async = require('async');
redis = require('redis');
mysql = require('node-mysql');
unscore = require('underscore');
connect = require("connect");

iniparser = require('iniparser');
config = iniparser.parseSync('./config.ini');

//DB Connection
var DB = mysql.DB;
pool = new DB({
	host     : config.mysql_host,    
	user     : config.mysql_username,
    password : config.mysql_password,
    database : config.mysql_db,
    port 	 : config.mysql_port,
    connectionLimit: 20
});
var calculation_logic = require('./calculation_logic');


var insert_transaction_query = 'inser into  bet_transaction SET ? ';
var update_balance_query  = 'update user_balance set balance = balance + ?  where user_id = ? ';
var select_user_transaction_for_game = 'select * from bet_transaction where user_id = ? and game_id = ?  ';

redisClient = redis.createClient(config.redis_num, config.redis_host, {no_ready_check: true});
redisClient.auth(config.redis_auth);
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
	//testAsync();
	transferDataTimer = setInterval(function(){ transferDataFromRedisToMySql() }, calling_interval);
}

function testAsync(){
	var users = {};
	for( i=0; i< 10; i++ )
		users[i] = i;
	async.forEachLimit(users, 5, function(messageId, next) {
		console.log(messageId);
		if(messageId == 4 ){
			var myError = new Error("message");
			next(myError);
		}else{
			next();
		}
	}, function(err) {
		if (err) {
			console.log('Completed with error');			
		}else{
			console.log('successfully completed ');
		}
	});
}

function lrangeFxn(){
	redisClient.lrange("game-no-list", 0, 0, function(err, game_number) {
		if(!err){
			redisClient.get('game_number', function(err, game_num) {
				if(!err){
					console.log( 'matching ' +  game_number + ' and  ' + game_num );
					if(game_num != game_number)
						transferData(game_number);
					else
						console.log('Game ' + game_number + ' is still not complete' );
				}
			});
		}
	});
}

function transferData(game_num){
	var game_user = 'game' + game_num + 'userbets';
	var game_magic_key = 'game' + game_num + 'magic';
	console.log(' Transferring data for Game number : ' + game_num);
	redisClient.hgetall(game_user, function(err, game_user_bet_string) {
		if( game_user_bet_string == null){
			console.log('No Bets To insert' + game_num);
			redisClient.del(game_magic_key);
			lpop();
		}
		else{
			addToDataBase(game_user, game_num, game_user_bet_string);
		}
	});
}

function addToDataBase(game_user, game_num, game_user_bet_string){
	var game_user = 'game' + game_num + 'userbets';
	var game_magic_key = 'game' + game_num + 'magic';
	var isPop = 1;
	redisClient.hkeys(game_user, function (err, replies) {
		async.forEachLimit(replies, 2, function (reply, calbk) {
			redisClient.get(game_magic_key, function(err, magic_number) {
				console.log(reply + ' has betted ' + game_user_bet_string[reply]);
				var betOut = calculation_logic.betOutput(game_user_bet_string[reply], magic_number);

				insertIntoDatabase( game_num, reply, game_user_bet_string[reply],magic_number, betOut, function (err, clk){
					console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' + err);  
					if(err)
						calbk(err);
					else	
						calbk();
				});


			});
		}, function(err) {
			console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& ' + err );
			if (!err) {
				redisClient.del(game_magic_key);
				redisClient.del(game_user);
				lpop();
			}

		}
		);
	});	
}

function insertIntoDatabase(game_num, user_id, bet_string, magic_number, betOut, clk){

	var bet_amount = betOut.totalBet;
	var final_amount = betOut.finalAmmount;
	var profit_loss = betOut.profit;

	var insertData = {user_id:user_id, game_id:game_num, bet_amount:bet_amount, final_amount:final_amount, profit_loss:profit_loss, bet_string:bet_string, magic_no:magic_number};
	
	console.log(insert_transaction_query + insertData );
	pool.getConnection(function(err,connection){
		if (err) {
			console.log('Cannot get connection from the Pool ' + err);
			clk(err);
			return;
		}	
		connection.query(select_user_transaction_for_game,[user_id,game_num], function(err,rows){
			if (err) { 
							//console.log('Error getting game_transaction data ' + err);
							clk(err);
							return;
						}
						console.log('#############################################################################');
						if(rows.length == 0 ){

							connection.beginTransaction(function(err) {	
								if (err) { clk(err);
									return;}
									connection.query(insert_transaction_query, insertData, function(err,rows){
										if (err) { 
											connection.rollback(function() {
												clk(err);
												return;
											});
										}

										connection.query(update_balance_query,[profit_loss,user_id], function(err,rows){
											if (err) { 
												connection.rollback(function() {
													clk(err);
													return;
												});
											}	
											console.log('Updated user balance '+ rows.length);
											connection.commit(function(err) {
												if (err) { 
													connection.rollback(function() {
														clk(err);
														return;
													});
												}	
												connection.release();
											});
										});
									});
								});
						}
					});
				// end of query
			});

}


function lpop(){
	redisClient.lpop("game-no-list" , function(errr, poped){
		console.log('Removed :---------------------------------------------------------------------------------- ' + poped);						
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


http.listen(config.background_port, function(){
	console.log('listening on *:'+config.background_port);
});