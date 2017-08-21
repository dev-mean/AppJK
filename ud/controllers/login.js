var crypto = require("crypto");
exports.index = function(req, res){
    // res.sendFile(appRoot + '/login.html');
    res.render('login');
};
exports.logout = function(req, res){
   req.session.destroy();
   res.redirect('/');
};
exports.loginverify = function(req, res){
    var fields = new Array();
    fields.push("username");
    fields.push("password");

    var parameterValue=JSON.parse(JSON.stringify(req.body));
    var i=0;
    var checkValid=1;
    
    for (i = 0; i < fields.length; i++) {
        if(typeof parameterValue[fields[i]]=="undefined"){
            checkValid=0;
            res.json({statusCode: 404, "success":"false", "message": "paramter "+fields[i]+" not found"});
            return;
        }
        if(parameterValue[fields[i]] == ""){
            checkValid=0;
            res.json({statusCode: 404, "success":"false", "message": fields[i]+" value not found"});
            return;
        }
    }   
    console.log('Username: ' + req.body.username);
    console.log('Password: ' + req.body.password);
    var username=req.body.username;
    var password=crypto.createHash('md5').update(req.body.password).digest('hex');
    pool.getConnection(function(err,connection){
        if (err) {
          console.log(' Cannot get connection from the Pool ');
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
            console.log(' Successfully got connection  from Poll with connection Id as : ' + connection.threadId);
            var qu = "select * from user where user_name = '"+ username + "' and password = '" + password + "' limit 1";
            console.log(qu);
            connection.query(qu ,function(err,rows){
            connection.release();
            if(!err) {
                if(rows.length > 0 ){
                    if(rows[0].status!= '1'){
                    console.log(' Status is not active');
                    res.json({statusCode: 401, "success":"false", message: "unathorised user"});
                    }else {
                        console.log(' Status is  active');
                        var time = new Date().getTime();
                        var auth_token=username+time;
                        auth_token=crypto.createHash('md5').update(auth_token).digest('hex');
                        console.log(' Authentication Token ' + auth_token);
                        req.session.member_id = rows[0].id;
                        req.session.member_username = rows[0].user_name;
                        req.session.member_name = rows[0].name;
                        req.session.priv = rows[0].type;   
                        req.session.token = auth_token;
                        //console.log(req.cookies);
                        redisClient.set("key_"+req.cookies.PHPSESSID, rows[0].id, redis.print);
                        res.redirect('/screen_option');
                        return;
                    }
                }else {
                    console.log(' Error executing query ');
                    res.json({statusCode: 404, "false":"false","message":"user not found"});
                    return;
                }
                
            }           
        });

        connection.on('error', function(err) { 
            console.log("Error connecting to database");
            res.json({statusCode: 404, "success":"false","message":"Error in connecting database"});            
              return;     
        });
  });   
}