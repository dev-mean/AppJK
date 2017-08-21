exports.roulette = function(req, res){
	res.sendFile(appRoot + '/roulette.html');
};
exports.mobile = function(req, res){
	res.sendFile(appRoot + '/mobile.html');
};
exports.screen_option = function(req, res){
	var member_id = req.session.member_id;
	query_get_user_balance = " select * from user_balance where user_id = ? ";

	redisClient.get('balance_' + member_id, function(err, balance) {
		if(err || balance === null) {
			pool.getConnection(function(err,connection){
				if (err) {
					// TODO Handle carefully
					console.log('Cannot get connection from the Pool ' + err);
					//res.json({"code" : 100, "status" : "Error in connection database"});
					return;
				}
				connection.query(query_get_user_balance, [member_id], function(err,rows){
					connection.release();
					if(!err) {
						if(rows.length > 0 ){
							res.render('screen_option',{'name':req.session.member_name, 'balance':rows[0].balance});
						}
						else {
							res.render('screen_option',{'name':req.session.member_name, 'balance':0});
						}
					}else{
            			res.json({statusCode: 500, "success":"false", "message": "Error"});
					}
				});
				connection.on('error', function(err) { 
            		res.json({statusCode: 500, "success":"false", "message": "Error"});       
					return;     
				});
			}); 
		}
		else{
			res.render('screen_option',{'name':req.session.member_name, 'balance':balance});
		}
	});
};

exports.admin = function(req, res){
	res.sendFile(appRoot + '/admin.html');
};