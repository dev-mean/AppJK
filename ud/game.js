module.exports = function () {
	//Game Parameters

	var calculation_logic = require('./calculation_logic');

	no_players = 0;
	is_magic_number_sent = 0;
	bet_end = 10; // in seconds
	usernames = {};
	
	query_get_user_balance = " select * from user_balance where user_id = ? ";
	

	io.sockets.on('connection', function(socket){
		var cookies = cookie.parse(socket.handshake.headers['cookie']);
		redisClient.get('key_'+cookies.PHPSESSID, function(err, reply) {
			no_players++;
			usernames[reply] = socket;
			console.log(reply+' is now connected! ');
			console.log(no_players + " players connected ");
			redisClient.lrange('list_magic_num', 0, 19, function(err, last_magic_numbers_list) {
				if(!err){
				console.log('Magic Number List : ' + last_magic_numbers_list); 
				socket.emit('last_magic_numbers_list', last_magic_numbers_list);
				}
			});
			
			redisClient.get('balance_' + reply, function(err, balance) {
				if(err || balance === null) {
					pool.getConnection(function(err,connection){
				if (err) {
					// TODO Handle carefully
					console.log('Cannot get connection from the Pool ' + err);
					//res.json({"code" : 100, "status" : "Error in connection database"});
					return;
					}
					connection.query(query_get_user_balance, [reply], function(err,rows){
					 connection.release();
					 if(!err) {
						if(rows.length > 0 ){
							console.log(' Balance for user ' + reply + ' is : ' + rows[0].balance);
							redisClient.set('balance_' + reply,  rows[0].balance);
							socket.emit("update_balance" , rows[0].balance);
						}
						else {
							console.log('No Row present for User in user balance table. ');
							socket.emit("update_balance" , 0);
						}
					 }else{
						console.log('Error: While Executing Query to get User Balance  ');
							return;
					 }
				});
				
				connection.on('error', function(err) { 
					console.log("Error connecting to database");         
					return;     
        });

			}); 
				}
				else{
					console.log(' Balance for user ' + reply + ' is : ' + balance);
					socket.emit("update_balance" , balance);
				}
			});
								
			
			redisClient.get('game_number', function(err, game_num) {
				socket.emit('join',{"game_number":game_num,"bet_end":bet_end});
				io.emit('no_players',no_players);
				io_admin.emit('no_players',no_players);

			});


			socket.on('disconnect', function(){
				console.log(reply + ' is disconnected');
				no_players--;
				io.emit('no_players',no_players);
				io_admin.emit('no_players',no_players);
			});

			socket.on('bet_string', function(bet_string){
				console.log(reply + ' Placed ' + bet_string);
				if(bet_string != null && bet_string.trim().length > 0 )
				{
					io_admin.emit("bet_string",bet_string);
					redisClient.get('game_number', function(err, game_num) {
					var game_user = 'game' + game_num + 'userbets';
					console.log('Hash for setting is ' + game_user);
					console.log(' For User Id ' + reply);
					console.log(' Bet String ' + bet_string);
					redisClient.hmset(game_user, reply, bet_string);
					redisClient.DECRBY('balance_'+ reply ,calculation_logic.getTotalBetAmount(bet_string));
				});
				}else{
				   console.log(reply + ' is online but did not place any bet! ');
				}
			});

		});  
	});
	
	io_admin.sockets.on('connection', function(socket){
			console.log('admin is now connected! ');								
			
			redisClient.get('game_number', function(err, game_num) {
				io_admin.emit('join',{"no_players":no_players, "game_number":game_num,"bet_end":bet_end});
			});


			socket.on('disconnect', function(){
				console.log('admin is disconnected');
			});

			socket.on('magic_number', function(mag_num){
				if(is_magic_number_sent == 0){
					console.log("Magic Number is : "+ mag_num);
					calculate_magic_number(mag_num);
					is_magic_number_sent = 1;
				}
				
			});
	});


	var bet_end_timer = setInterval(bet_end_timer_func, 1000);

	function bet_end_timer_func(){
		bet_end--;
		io.emit("bet_end",bet_end);
		io_admin.emit("bet_end",bet_end);
		if(bet_end <= 0){
		    clearInterval(bet_end_timer); //clear bet end timer

		    setTimeout(function(){
		    	if(is_magic_number_sent == 0){
					var magic_number_auto = Math.floor(Math.random()*36);
					//var magic_number_auto = 1;
		    		calculate_magic_number(magic_number_auto);
		    		is_magic_number_sent = 1;
		    	}
		    }, 8000); // if number is not decided in 8 seconds
		}
	}


function calculate_magic_number(mag_num){
   	// calculation of the bet strings
		redisClient.lpush("list_magic_num", mag_num, function(err, reply){ 
			//console.log(reply); 
			redisClient.ltrim("list_magic_num", 0, 19);
		});
		redisClient.get('game_number', function(err, game_num) {
		magic_number = mag_num;
		io.emit("magic_number",magic_number );
		io_admin.emit("magic_number",magic_number );
   		redisClient.set("magic_number", magic_number, redis.print);
   		var game_magic_key = 'game' + game_num + 'magic';
		redisClient.set(game_magic_key, magic_number, redis.print);
		var game_user = 'game' + game_num + 'userbets';
		//console.log('Has key for get all : ' + game_user);
		console.time('bet-calculation-time');
			redisClient.hgetall(game_user, function(err, object) {
   			//object = JSON.parse(object);
			console.timeEnd('bet-calculation-time');
   			console.log(' Bet on Game Number ' + game_num + ' is : ' + object);
			console.log(' Magic number is ' + magic_number);
			console.log(' Calculating bet outcomes ');
			redisClient.hkeys(game_user, function (err, replies) {
				async.forEach(replies, function (reply, calbk) {
					console.log(reply + ' has betted ' + object[reply]);
						var betOut = calculation_logic.betOutput(object[reply], magic_number);
						redisClient.INCRBY('balance_'+ reply , betOut.finalAmmount);
						var soc =	usernames[reply];
						soc.emit('result', betOut);
					}, function(err) {
						
					});
				});
				console.timeEnd('bet-calculation-time');
   		});
   		//redisClient.get('magic_number', function(err, reply) {
   			setTimeout(function(){
   				redisClient.incr('game_number');
				// TODO
				var game_number = game_num;
   				game_number++;
				redisClient.lpush("list_magic_num", mag_num);
   				is_magic_number_sent = 0;
				console.log('adding new Game ' + game_number);
				redisClient.rpush("game-no-list", game_number);
   				io.emit("start_new_game",game_number);
   				io_admin.emit("start_new_game",game_number);
				
				console.log('Starting new Game with Game Number ' + game_number);
   				bet_end = 10;
   				bet_end_timer = setInterval(bet_end_timer_func,1000);
   			}, 18000);
   		//});
   	});
}

};