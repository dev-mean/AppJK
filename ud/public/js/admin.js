var game_id;
var time_left_to_bet;
var total_bets_money = 0;
var max_profit_number = -2, min_profit_number = -2, max_loss_number = -2, min_loss_number = -2;
var max_profit = 0, min_profit = 0, max_loss = 0, min_loss = 0;
// var totalBet;
// var finalAmmount;
var socket = io.connect(admin_url);
var admin_profit = [];
//when user joins the game
socket.on('join', function(data){
	$("#no_players").html(data.no_players);
	$("#game_number").html(data.game_number);
	game_id = data.game_number;
	time_left_to_bet = data.bet_end;
	if(time_left_to_bet == 0) {
		show_status("Betting in progress ... Wait for next game");
	}
	for (var i = - 1; i <= 36; i++) {
		admin_profit[i] = 0;
	};
});

function show_status(message){
	$("#status").html(message);
}

socket.on("bet_end",function(bet_end){
	$("#bet_end").html(bet_end);
	time_left_to_bet = bet_end;
	if(time_left_to_bet == 0){
		for (var i = -1; i <= 36; i++) {
			if(isRed(i)){
				$("#bets").append("<div class='bet_val last_red'>"+i+" : 0 <input type='button' onclick='release_magic_number("+i+")' value='Set'><div>");
			} else if (i == 0){
				$("#bets").append("<div class='bet_val last_green'>"+i+" : 0 <input type='button' onclick='release_magic_number("+i+")' value='Set'><div>");
			} else if(i == -1){
				$("#bets").append("<div class='bet_val last_green'>00 : 0 <input type='button' onclick='release_magic_number("+i+")' value='Set'><div>");
			} else{
				$("#bets").append("<div class='bet_val last_black'>"+i+" : 0 <input type='button' onclick='release_magic_number("+i+")' value='Set'><div>");
			}
   		}
	}
});

socket.on('no_players', function(data){
	$("#no_players").html(data);
});

socket.on("start_new_game",function(game_number){
	game_id = game_number;
	$("#game_number").html(game_number);
	$("#bets").html('');
	$("#profit_loss").html('');
	totalBet = 0;
	for (var i = - 1; i <= 36; i++) {
		admin_profit[i] = 0;
	};
	max_profit_number = -2; min_profit_number = -2; max_loss_number = -2; min_loss_number = -2;
	max_profit = 0; min_profit = 0; max_loss = 0; min_loss = 0;
	total_bets_money = 0;
	$("#total_money_in").html('0');
});

socket.on("bet_string",function(bet_string){
	betAnalyzer(bet_string);
});

socket.on("magic_number", function(magic_num){

	if(isRed(magic_num)){
		$("#last_bets").prepend('<div class="last_red">'+magic_num+'</div>');
	}  else if(magic_num == 0 ) {
		$("#last_bets").prepend('<div  class="last_green">'+magic_num+'</div>');
	}  else if( magic_num == -1) {
		$("#last_bets").prepend('<div  class="last_green">00</div>');
	}  else {
		$("#last_bets").prepend('<div  class="last_black">'+magic_num+'</div>');
	}

	$("#last_bets").find('div').eq(20).remove();
});

function getTotalBetAmount(betStr){
	var betAmt = 0;
	var betArr = betStr.split(",");
	var arrayLeng = betArr.length;
	if(arrayLeng == 0)
		return betAmt;
	
	for (var i = 0; i < arrayLeng; i++) {
		i++;
    	betAmt = +betAmt + +betArr[i];
	}
	return betAmt;
}

function betAnalyzer(betString){
	
	$("#bets").html('');
   	total_bets_money +=  getTotalBetAmount(betString);
   	var pos_flag = 0;
   	var neg_flag = 0;
	//console.log(max_profit);
   	for (var i = -1; i <= 36; i++) {
   		var betOutputThis = betOutput(betString, i);
   		var profit = betOutputThis.profit;
	 	if(isRed(i)){
			$("#bets").append("<div class='bet_val bet_profit_"+profit+" last_admin_red'>"+i+" : "+profit+" <input type='button' onclick='release_magic_number("+i+")' value='Set'><div>");
		} else if (i == 0){
			$("#bets").append("<div class='bet_val bet_profit_"+profit+" last_admin_green'>"+i+" : "+profit+" <input type='button' onclick='release_magic_number("+i+")' value='Set'><div>");
		} else if(i == -1){
			$("#bets").append("<div class='bet_val bet_profit_"+profit+" last_admin_green'>00 : "+profit+" <input type='button' onclick='release_magic_number("+i+")' value='Set'><div>");
		} else{
			$("#bets").append("<div class='bet_val bet_profit_"+profit+" last_admin_black'>"+i+" : "+profit+" <input type='button' onclick='release_magic_number("+i+")' value='Set'><div>");
		}
		$("#total_money_in").html(total_bets_money);

	 	if(profit > 0){
	 		if(pos_flag == 0) {
	 			max_profit = profit;
	 			min_profit = profit;
	 			pos_flag = 1;
	 		}
	 		if(profit > max_profit){
	 			max_profit = profit;
	 			max_profit_number  = i;
	 		} else if(profit < min_profit ) {
	 			min_profit = profit;
	 			min_profit_number  = i;
	 		}
	 	}
	 	if(profit < 0){
	 		if(neg_flag == 0) {
	 			max_loss = profit;
	 			min_loss = profit;
	 			neg_flag = 1;
	 		}
	 		if(profit < max_loss){
	 			max_loss = profit;
	 			max_loss_number  = i;
	 		} else if(profit > min_loss) {
	 			min_loss = profit;
	 			min_loss_number  = i;
	 		}
	 	}
	 	if(i == 36){
	 		$("#profit_loss").html("<style>.bet_profit_"+max_profit+"{border:10px solid #13A254}.bet_profit_"+min_profit+"{border:10px solid #0F199A}.bet_profit_"+min_loss+"{border:10px solid #D4A10A}.bet_profit_"+max_loss+"{border:10px solid #D40A0A}</style>Max Profit (Green):" + max_profit + "&nbsp;&nbsp;&nbsp;&nbsp;Min Profit:(Blue)" +min_profit+ "<br>Max Loss:(Red)" + max_loss + "&nbsp;&nbsp;&nbsp;&nbsp;Min Loss:(Yellow)" +min_loss );
	 	}
   	}
}

function release_magic_number(magic_num){
	socket.emit("magic_number",magic_num);	
}

function betOutput(betString, magicNum){

    // these are outputs
    var totalBet = 0;
    var finalAmmount = 0;
    var profit;
    var betArray = betString.split(",");

    var arrayLength = betArray.length;
	if(betArray.lenth == 0)
	{
		return {
    	totalBet: totalBet,
    	finalAmmount: finalAmmount,
    	profit: finalAmmount - totalBet
		}; 
	}
    var betCode = -2;
    var betAmount = 0;
    var multiplier = 0;
    for (var i = 0; i < arrayLength; i++) {
    	multiplie = 0;
    	betCode = betArray[i];
    	betAmount = betArray[++i];
    	totalBet = +totalBet + +betAmount;
    	multiplier = getMultiplier(betCode, magicNum);
    	finalAmmount = +finalAmmount + +(multiplier * betAmount);
    }
    profit = -(finalAmmount - totalBet);
    
    admin_profit[magicNum] += profit;
    if(magicNum == 1) console.log(admin_profit[1]);
    return {
    	totalBet: totalBet,
    	finalAmmount: finalAmmount,
    	profit: admin_profit[magicNum]
    };  
}

function getMultiplier(betCode, magicNum){
	// treating 0 and -1
	var multiplier = 0;
	if( magicNum == -1 || magicNum == 0 ){
		if( magicNum == betCode ){
			multiplier = 36;
		}
	}
	else{
		if( betCode >= 1 && betCode <= 36 && betCode == magicNum ){
			multiplier = 36;			
		}
		if( betCode == 37 && (magicNum % 3 == 1)){
			multiplier = 3;
		}
		if( betCode == 38 && (magicNum % 3 == 2)){
			multiplier = 3;
		}
		if( betCode == 39 && (magicNum % 3 == 0)){
			multiplier = 3;
		}
		if( betCode == 40 && magicNum >= 1 && magicNum <=12 ){
			multiplier = 3;		
		}
		if( betCode == 41 && magicNum >= 13 && magicNum <=24 ){
			multiplier = 3;
		}
		if( betCode == 42 && magicNum >= 25 && magicNum <=36 ){
			multiplier = 3;
		}
		if( betCode == 43 && magicNum >= 1 && magicNum <=18 ){
			multiplier = 2;
		}
		if( betCode == 44 && magicNum >= 19 && magicNum <=36){
			multiplier = 2;
		}
		if( betCode == 45 && (magicNum % 3 == 0)){
			multiplier = 2;
		}
		if( betCode == 46 && (magicNum % 3 == 1)){
			multiplier = 2;
		}
		if( betCode == 47   && isRed(magicNum)){
			multiplier = 2;
		}
		if( betCode == 48 && !isRed(magicNum)){
			multiplier = 2;
		}
	}
	return multiplier;
}

function isRed(num){
	var red = false;
	switch(num){
		case 1:
		red = true;
		case 3:  
		red = true;
		case 5:  
		red = true;
		case 7:  
		red = true;
		case 9:  
		red = true;
		case 12:  
		red = true;
		case 14:  
		red = true;
		case 16:  
		red = true;
		case 18:  
		red = true;
		case 19:  
		red = true;
		case 21:  
		red = true;
		case 23:  
		red = true;
		case 25:  
		red = true;
		case 27:  
		red = true;
		case 30:  
		red = true;
		case 32:  
		red = true;
		case 34:  
		red = true;
		case 36:  
		red = true;
	}
	return red;
}