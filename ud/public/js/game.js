var game_id;
var game_eligible = 0;
var magic_number;
var credits = 0;
var credits_bal = credits;
var profit;
//bets
var bets = [];
var bets_others = [];
var last_bet = [];
var last_bet_count = 0;
var last_bet_div_value = 0;
var bet_value = 1;
var time_left_to_bet = 0;
var bet_place = 0; // to be changes to 0
var bet_amount = 0;
var won = 0;

//ball
var img;
var img1;
var ball_stop_flag = 0;
var is_ball_rotating = 0;
var wheel_animation;
var ball;
var wheel;
var wheel_top_shadow;

// compute
var seq = [18,6,21,33,16,4,23,35,14,2,0,28,9,26,30,11,7,20,32,17,5,22,34,15,3,24,36,13,1,-1,27,10,25,29,12,8,19,31];
var seq_angle = [0,9.474,18.948,28.422,37.896,47.37,56.844,66.318,75.792,85.266,94.74,104.214,113.688,123.162,132.636,142.11,151.584,161.058,170.532,180.006,189.48,198.954,208.428,217.902,227.376,236.85,246.324,255.798,265.272,274.746,284.22,293.694,303.168,312.642,322.116,331.59,341.064,350.538];

var reds = [1,3,5,7,9,12,14,16,18,21,23,25,27,30,32,34,36];
var blacks = [2,4,6,8,10,11,13,15,17,19,20,22,24,26,28,29,31,33,35];
//sockets
var socket = io.connect(game_url);

//when user joins the game
socket.on('join', function(data){
	$("#game_number").html(data.game_number);
	game_id = data.game_number;
	time_left_to_bet = data.bet_end;
	if(time_left_to_bet == 0) {
		show_status("Wait for next game");
	}
	else {

		bet_place = 1;
		game_eligible = 1;
	}
});

socket.on('no_players', function(data){
	$("#no_players").html(data);
});

socket.on('result', function(data){
	credits = credits - data.totalBet + data.finalAmmount;
	won = data.finalAmmount;
	credits_bal = credits;
});


socket.on('update_balance', function(data){
	$("#credits").html(data);
	credits = data;
	credits_bal = credits;
});

socket.on('last_magic_numbers_list', function(data){
	
});

socket.on("bet_end",function(bet_end){
	$("#bet_end").html(bet_end);
	time_left_to_bet = bet_end;
	if(time_left_to_bet == 0) {
		betEnd();
		// this is the place where bet string is sent
		var bet_string = '';
		for (var i = - 1; i <= 48; i++) {
			if(bets[i]){
				bet_string += ','+i+','+bets[i];
			}
		};
		bet_string = bet_string.substr(1);
		console.log(bet_string);
		//socket.emit("bet_string",'47,20,48,40');
		socket.emit("bet_string",bet_string);
	}
	else {
		bet_place = 1;
		console.log(time_left_to_bet);
		if(time_left_to_bet == 5){
			createjs.Sound.play("betting_end_five");
		}
	}
	$('#circle').circleProgress('value', time_left_to_bet/10);

});

socket.on("magic_number", function(mag_no){
	magic_number = mag_no;
	hide_status();
	ball.rotation = 0;
	wheel.rotation = 0;
	ball.regX = 100;
	ball.regY = 100;
	var offset = 120;
	wheel_top_shadow.visible = false;
	ball.visible = true;
    var angle_to_rotate = 1800 + seq_angle[seq.indexOf(magic_number)] - offset - 45;
    console.log(angle_to_rotate);
    createjs.Sound.play("wheel_sound");
	var tween2 = createjs.Tween.get(ball, {loop: false}).to({rotation: angle_to_rotate, regX: 62, regY:62}, 10000, createjs.Ease.circOut).call(magic_number_complete).to({rotation: angle_to_rotate - 600}, 5000);

	var tween = createjs.Tween.get(wheel, {loop: false}).to({rotation: -1800}, 15000);
	setTimeout(GameEnd,15000);
	
});

socket.on("start_new_game",function(game_number){
	$("#bet_text").show();
	$("#won_text").hide();

	hide_status();
	game_id = game_number;
	game_eligible = 1;
	$("#game_number").html(game_number);
	is_ball_rotating = 0;
	bet_place = 1;
	ball_stop_flag = 0;

	bets = [];
	bets_others = [];
	ball.visible = false;
	$("#final_number").html('');
	$('#circle').circleProgress('value', 1);
	won = 0;
	bet_amount = 0;
	update_bet_amount();
	//last_bet = [];
	//last_bet_count = 0;
	//last_bet_div_value = 0;
	createjs.Sound.play("new_game");
	$("#won_text").removeClass('swing');

});

function show_status(msg){
	$("#status").show();
	$("#status").html(msg);
}
function hide_status(msg){
	$("#status").hide();
}

function betEnd(){
	show_status("Placing your bet");
	bet_place = 0; // to be changes to 0
	createjs.Sound.play("placing_your_bet");
}
function magic_number_complete(){
	if(magic_number != -1) $("#final_number").html(magic_number);
	else $("#final_number").html("00");
	wheel_top_shadow.visible = true;
	if(reds.indexOf(magic_number) !== -1){
		$("#bets").prepend('<div class="last_red">'+magic_number+'</div>');
	} else if(blacks.indexOf(magic_number) !== -1) {
		$("#bets").prepend('<div  class="last_black">'+magic_number+'</div>');
	} else if(magic_number == 0){
		$("#bets").prepend('<div  class="last_green">'+magic_number+'</div>');
	} else {
		$("#bets").prepend('<div  class="last_green">00</div>');
	}
	$("#bets").find('div').eq(10).remove();

	$("#bet_text").hide();
	$("#won_text").show();

	$("#bet_amount").html(won);

	if(won > 0){
		$("#won_text").addClass('swing');

		createjs.Sound.play('won');
		createjs.Sound.play('you_won');
		$(".coin").each(function(e){
			 $( this ).animate({
			    opacity: 0,
			    top: "-100",
			    left: "200"
			  	}, 1000, function() {
			    	$(this).remove();
			  });
		});
	} else {
		$(".coin").each(function(e){
			 $( this ).animate({
			    opacity: 0,
			    top: "-100",
			    left: "-100"
			  	}, 1000, function() {
			    	$(this).remove();
			  });
		});
	}

	$(".coin_text").remove();

	$({percentage: parseInt($("#credits").html())}).stop(true).animate({percentage: credits}, {
        duration : 2000,
        step: function () {
            var percentageVal = Math.round(this.percentage);
            $("#credits").html(percentageVal);
        }
    }).promise().done(function () {
        // hard set the value after animation is done to be
        // sure the value is correct
        $("#credits").html(credits);
    });

}

function GameEnd(){
	

	
	
	// $("#overlay").hide();
	// $("#holder").hide();
	show_status("Wait for next game");
	// $('#bee').transition({ rotate: '0deg' },1000, 'linear');
	// $('#ball_sr').transition({ rotate: '0deg', x: '-=40' },1000, 'linear');

	// img1.hide();
 //    img1.animate({transform: "r0,160,160,t0,0"},1);
 	
	
}

// DURING BETTING
var stage, wheel_image;

function init () {

	//wheel
	stage = new createjs.Stage("roulette");
	createjs.Ticker.addEventListener("tick", tick);
	stage.update();
	wheel_image = new Image();
	wheel_image.src = "img/wheel.png";
	wheel_image.onload = handleWheelImageLoad;

	Interface();

	$("body").sparkle({

        color: ["#2eafea","#e56604"],
        speed: 0.4

    });

    $("#betting_table").sparkle({

        color: ["#2eafea","#e56604"],
        count: 100,
        speed: 0.4

    });

    var audioPath = "sounds/";
    var sounds = [
        {id:"wheel_sound", src:"wheel_sound.ogg"},
        {id:"placing_your_bet", src:"placing_your_bet.ogg"},
        {id:"fiche_select", src:"fiche_select.ogg"},
        {id:"won", src:"won.ogg"},
        {id:"new_game", src:"new_game.ogg"},
        {id:"betting_end_five", src:"betting_end_five.ogg"},
        {id:"you_won", src:"you_won.ogg"}
    ];
 
    // createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.addEventListener("fileload", handleLoad);
    createjs.Sound.registerSounds(sounds, audioPath);
}

function handleLoad(event) {
    console.log('Sounds Loaded');
}

$(".clear_bets").click(function(e){
	if(last_bet_count > 0 && bet_place == 1){
		bets = [];
		bets_others = [];
		last_bet = [];
		last_bet_count = 0;
		last_bet_div_value = 0;
		bet_amount = 0;
		update_bet_amount();
		$(".coin").fadeTo(500,0, function(){
			$(".coin").remove();
		});
		$(".coin_text").remove();
	}
});

$(".clear_last_bet").click(function(e){
	if(last_bet_count > 0 && bet_place == 1){
		last_bet_count-- ;
		bets_others[last_bet[last_bet_count].div_value] -= last_bet[last_bet_count].money;
		update_coins_final(last_bet[last_bet_count].div_value);

		effected_bets = last_bet[last_bet_count].effected.split(',');
		for (var i = effected_bets.length - 1; i >= 0; i--) {
			bets[effected_bets[i]] -= last_bet[last_bet_count].money/effected_bets.length;
		};
		bet_amount -= last_bet[last_bet_count].money;
		update_bet_amount();
		last_bet.pop();
		console.log(last_bet);
	}
});

$(".bet-coin").click(function(){
	// alert('asd');
	$(".bet-coin").removeClass("bet-coin-select");
	$(this).addClass("bet-coin-select");
	var value = $(this).attr("data-id");
	bet_value = parseInt(value);
	console.log(bet_value);
});

function update_bet_amount(){
	$("#bet_amount").html(bet_amount);
	credits_bal = credits - bet_amount;
	$("#credits").html(credits_bal);
}
function handleWheelImageLoad(event){
	var image = event.target;
	wheel = new createjs.Bitmap(image);
	wheel.x = 200;
	wheel.y = 200;
	wheel.regX = 160;
	wheel.regY = 160;
	stage.addChild(wheel);
	stage.update();
	ball_image = new Image();
	ball_image.src = "img/ball.png";
	ball_image.onload = handleBallImageLoad;
	
	wheel_top_shadow = new createjs.Shape();
	wheel_top_shadow.graphics.beginFill("rgba(0,0,0,.4)").drawCircle(200, 200, 160);
	stage.addChild(wheel_top_shadow);

}
function handleBallImageLoad(event){
	var image = event.target;
	ball = new createjs.Bitmap(image);
	ball.x = 200;
	ball.y = 200;
	ball.regX = 100;
	ball.regY = 100;
	ball.visible = false;

	stage.addChild(ball);
	wheel_top_shadow.mask = ball;
	stage.update();
}



function tick(event) {
	stage.update(event);
}

function update_coins(num,x,y,xminus,yminus,xtext,ytext,bet_value){
	
	$(".coin_"+num).remove();
	$(".text_"+num).remove();
	var in_bet_value = bet_value;
	if(Math.floor(bet_value/5000) >= 1){
		$("#bet_table").append('<div class="coin coin_'+ num+'" style="top:'+ y +'px; left:'+ x +'px "><img src="img/5000.png" style="width:36px; height:auto"></div>');
		bet_value = bet_value - Math.floor(bet_value/5000)*5000;
		x=x-xminus; y = y-yminus;
	}

	if(bet_value/1000 >= 1){
		$("#bet_table").append('<div class="coin coin_'+ num+'" style="top:'+ y +'px; left:'+ x +'px "><img src="img/1000.png" style="width:36px; height:auto"></div>');
		bet_value = bet_value - Math.floor(bet_value/1000)*1000;
		x=x-xminus; y = y-yminus;
	}
	if(bet_value/100 >= 1){
		$("#bet_table").append('<div class="coin coin_'+ num+'" style="top:'+ y +'px; left:'+ x +'px "><img src="img/100.png" style="width:36px; height:auto"></div>');
		bet_value = bet_value - Math.floor(bet_value/100)*100;
		x=x-xminus; y = y-yminus;
	}
	if(bet_value/50 >= 1){
		$("#bet_table").append('<div class="coin coin_'+ num+'" style="top:'+ y +'px; left:'+ x +'px "><img src="img/50.png" style="width:36px; height:auto"></div>');
		bet_value = bet_value - Math.floor(bet_value/50)*50;
		x=x-xminus; y = y-yminus;
	}
	if(bet_value/10 >= 1){
		$("#bet_table").append('<div class="coin coin_'+ num+'" style="top:'+ y +'px; left:'+ x +'px "><img src="img/10.png" style="width:36px; height:auto"></div>');
		bet_value = bet_value - Math.floor(bet_value/10)*10;
		x=x-xminus; y = y-yminus;
	}
	if(bet_value/5 >= 1){
		$("#bet_table").append('<div class="coin coin_'+ num+'" style="top:'+ y +'px; left:'+ x +'px "><img src="img/5.png" style="width:36px; height:auto"></div>');
		bet_value = bet_value - Math.floor(bet_value/5)*5;
		x=x-xminus; y = y-yminus;
	}
	if(bet_value/1 >= 1){
		$("#bet_table").append('<div class="coin coin_'+ num+'" style="top:'+ y +'px; left:'+ x +'px "><img src="img/1.png" style="width:36px; height:auto"></div>');
		bet_value = bet_value - Math.floor(bet_value/1)*1;
		x=x-xminus; y = y-yminus;
	}
	$("#bet_table").append('<div class="coin_text text_'+num+'" style="top:'+ ytext +'px; left:'+ xtext +'px; ">'+in_bet_value+'</div>');
}

function update_coins_final(num){
	
	var point = $("div[value="+num+"]");
	var y = point.position().top;
	var x = point.position().left;
	
	if(num == 0){

		x = x + 0;
		y = y + 18;
		xminus = -5;
		yminus = 0;
		xtext = x+16;
		ytext = y+8;
	} else if(num == -1){

		x = x + 0;
		y = y + 18;
		xminus = -5;
		yminus = 0;
		xtext = x+16;
		ytext = y+8;
	} else if ( num <= 36 && num >= 1){
		x = x + 0;
		y = y + 8;
		xminus = 0;
		yminus = 5;
		xtext = x;
		ytext = y+8;
	} else if ( num <= 39 && num >= 37){ // two to one
		x = x + 2;
		y = y + 8;
		xminus = 0;
		yminus = 5;
		xtext = x;
		ytext = y+8;
	} else if (num <= 42 && num >= 40 ){ 
		
	// three half to one
		x = x + 12;
		y = y + 12;
		xminus = -5;
		yminus = 0;
		xtext = x+48;
		ytext = y+8;
	} else if (num <= 44 && num >= 43){ // 1 half click
		x = x + 12;
		y = y + 12;
		xminus = -5;
		yminus = 0;
		xtext = x+8;
		ytext = y+8;
	} else if (num <= 46 && num >= 45){ // odd even
		x = x + 12;
		y = y + 12;
		xminus = -5;
		yminus = 0;
		xtext = x+8;
		ytext = y+8;
	} else if (num <= 48 && num >= 47){ // red vlack
		x = x + 12;
		y = y + 12;
		xminus = -5;
		yminus = 0;
		xtext = x+8;
		ytext = y+8;
	} else if (num < 200 && num >= 100){ // two select
		x = x - 12;
		y = y + 6;
		xminus = 0;
		yminus = 0;
		xtext = x;
		ytext = y;
	} else if (num <= 300 && num >= 200){ // four select
		x = x - 10;
		y = y - 16;
		xminus = 0;
		yminus = 0;
		xtext = x;
		ytext = y;
	}

	$(".coin_"+num).remove();
	$(".text_"+num).remove();

	var in_bet_value = bets_others[num];
	var bet_value_div = in_bet_value;

	if(Math.floor(bet_value_div/5000) >= 1){
		$("#bet_table").append('<div class="coin coin_'+ num+'" style="top:'+ y +'px; left:'+ x +'px "><img src="img/5000.png" style="width:36px; height:auto"></div>');
		bet_value_div = bet_value_div - Math.floor(bet_value_div/5000)*5000;
		x=x-xminus; y = y-yminus;
	}

	if(bet_value_div/1000 >= 1){
		$("#bet_table").append('<div class="coin coin_'+ num+'" style="top:'+ y +'px; left:'+ x +'px "><img src="img/1000.png" style="width:36px; height:auto"></div>');
		bet_value_div = bet_value_div - Math.floor(bet_value_div/1000)*1000;
		x=x-xminus; y = y-yminus;
	}
	if(bet_value_div/100 >= 1){
		$("#bet_table").append('<div class="coin coin_'+ num+'" style="top:'+ y +'px; left:'+ x +'px "><img src="img/100.png" style="width:36px; height:auto"></div>');
		bet_value_div = bet_value_div - Math.floor(bet_value_div/100)*100;
		x=x-xminus; y = y-yminus;
	}
	if(bet_value_div/50 >= 1){
		$("#bet_table").append('<div class="coin coin_'+ num+'" style="top:'+ y +'px; left:'+ x +'px "><img src="img/50.png" style="width:36px; height:auto"></div>');
		bet_value_div = bet_value_div - Math.floor(bet_value_div/50)*50;
		x=x-xminus; y = y-yminus;
	}
	if(bet_value_div/10 >= 1){
		$("#bet_table").append('<div class="coin coin_'+ num+'" style="top:'+ y +'px; left:'+ x +'px "><img src="img/10.png" style="width:36px; height:auto"></div>');
		bet_value_div = bet_value_div - Math.floor(bet_value_div/10)*10;
		x=x-xminus; y = y-yminus;
	}
	if(bet_value_div/5 >= 1){
		$("#bet_table").append('<div class="coin coin_'+ num+'" style="top:'+ y +'px; left:'+ x +'px "><img src="img/5.png" style="width:36px; height:auto"></div>');
		bet_value_div = bet_value_div - Math.floor(bet_value_div/5)*5;
		x=x-xminus; y = y-yminus;
	}
	if(bet_value_div/1 >= 1){
		$("#bet_table").append('<div class="coin coin_'+ num+'" style="top:'+ y +'px; left:'+ x +'px "><img src="img/1.png" style="width:36px; height:auto"></div>');
		bet_value_div = bet_value_div - Math.floor(bet_value_div/1)*1;
		x=x-xminus; y = y-yminus;
	}
	if(in_bet_value > 0){
		$("#bet_table").append('<div class="coin_text text_'+num+'" style="top:'+ ytext +'px; left:'+ xtext +'px; ">'+in_bet_value+'</div>');
	}
	
}