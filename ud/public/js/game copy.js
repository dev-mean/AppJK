var game_id;
var bets = [];
var last_bet = [];
var last_bet_count = 0;
var last_bet_div_value = 0;
var bet_value = 10;
var time_left_to_bet = 0;
var bet_place = 0;

var stop_at = 270;
var ball_rotate;
var wheel_angle = 0;

var ball = $("#ball");
var ball_width = $("#ball").width();
$("#ball").hide();

var ball_stop_flag = 0;
var angle_ball = 0;
var initial_speed = 10;
var time_count = 0;
var accel_count = 0;
var angle_start = 0;
var game_start_bet = 0;
var game_eligible = 0;
var magic_number;
var is_ball_rotating = 0;
var img;
var img1;
var wheel_animation;

var seq = [1,20,14,31,9,22,18,29,7,28,12,35,3,26,0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33];

var seq_angle = [0,9.73,19.46,29.19,38.92,48.65,58.38,68.11,77.84,87.57,97.3,107.03,116.76,126.49,136.22,145.95,155.68,165.41,175.14,184.87,194.6,204.33,214.06,223.79,233.52,243.25,252.98,262.71,272.44,282.17,291.9,301.63,311.36,321.09,330.82,340.55,350.28];
//sockets
var socket = io();

//when user joins the game
socket.on('join', function(data){
	$("#no_players").html(data.no_players);
	$("#game_number").html(data.game_number);
	$("#bet_end").html(data.bet_end);
	game_id = data.game_number;
	time_left_to_bet = data.bet_end;

	if(time_left_to_bet == 0) {
		$("#status").html("Wait for next game");
	}
	else {
		bet_place = 1;
		game_eligible = 1;
	}

});

socket.on("bet_end",function(bet_end){
	$("#bet_end").html(bet_end);
	time_left_to_bet = bet_end;
	if(time_left_to_bet == 0) betEnd();
	else bet_place = 1;
});

socket.on("status", function(msg){
	$("#status").html(msg);
});

socket.on("magic_number", function(mag_no){
	$("#status").html(mag_no);
	magic_number = mag_no;
	ball_stop_flag = 1;
});

socket.on("game_number_change",function(game_number){
	game_id = game_number;
	game_eligible = 1;
	$("#game_number").html(game_number);
	is_ball_rotating = 0;
	bet_place = 1;
	ball_stop_flag = 0;
});

function betEnd(){
	bet_place = 0;
	$("#ball").show();
	console.log("betting_end: "+game_id);
	ball_rotate = setInterval(ball_rotate_function,20);
	if(game_eligible == 1){
		//img.stop().animate(wheel_animation.repeat(Infinity));
	}
	img1.hide();
    img1.animate({transform: "r0,160,160,t0,0"},1);
}
function resetGame(){
	console.log("wheel rotate end: "+game_id);
	clearInterval(ball_rotate);
	$("#ball").hide();
	$("#ball").css("width","400px");
	ball_width = 400;
	$("#ball").css("transform","rotate(0deg)");
	$("#ball").css("left","42.5px");
	time_count = 0;
	ball_stop_flag = 0;
	accel_count = 0;
	angle_ball = 0;
	angle_start = 0;
}


var wheel_rotate = setInterval(function(){
    wheel_angle-=0.25;
  $("#wheel img").css("transform","rotate("+wheel_angle+"deg)");
  if(wheel_angle < -360) wheel_angle += 360;
  //console.log(wheel_angle);
},20);
    

function ball_rotate_function(){

	if(initial_speed - 10/505*time_count < 0 && accel_count == 1){
		resetGame();
	}
	if(accel_count ==  1){
		ball_width = ball_width - 0.35;
		$("#ball").css("width",ball_width+"px");
		$("#ball").css("left",(42.5 + 0.35*time_count/2)+"px");
		angle_ball = angle_start + initial_speed - 10/505*time_count;
		//console.log(time_count);
	} else  angle_ball = angle_start + initial_speed;

	time_count++;
 	
 	if(angle_ball >= 360) {
  	angle_ball = angle_ball - 360;
	}

	angle_start = angle_ball;
	if(angle_ball >= 0){
		$("#ball").css("transform","rotate("+angle_ball+"deg)");
	} else {
	}
  
  	if(accel_count == 1 && time_count > 400 && ( angle_ball > (stop_at_final -2) && angle_ball < (stop_at_final + 2)) ) {
	  	//console.log(time_count);
	  	$("#ball").css("transform","rotate("+stop_at_final+"deg)");
	  	resetGame();
	};

	if(ball_stop_flag == 1 && accel_count == 0){
	    stop_at_final = stop_at + wheel_angle - 125;
	    if(stop_at_final < 0) stop_at_final += 360;
	    if( angle_ball > (stop_at_final -6) && angle_ball < (stop_at_final + 6) ) {
	    	accel_count = 1;
	    	time_count = 0; 
	    }
	}


}



// DURING BETTING

function init () {

	var src = document.getElementById("bee").src;
	var src2 = document.getElementById("ball_sr").src;
    document.getElementById("holder").innerHTML = "";
    var R = Raphael("holder", 320, 320);
    R.circle(320, 240, 200).attr({fill: "#000", "fill-opacity": .0, "stroke-width": 0});
    img = R.image(src, 0, 0, 320, 320);
    img1 = R.image(src2, 30, 160, 10, 10);
    img1.attr({rx:100,ry:100,cx:160,cy:160});
    img1.hide();

     wheel_animation = Raphael.animation({transform: "r" + 360}, 8000, "linear", function(){
    	if(is_ball_rotating == 0 && bet_place == 0 && game_eligible == 1 && ball_stop_flag == 1 ){
    		//img.stop().animate(wheel_animation_stopping);
    		console.log(seq.indexOf(magic_number));
    		var angle_to_rotate = -1800 - 360 + seq_angle[seq.indexOf(magic_number)];

    		console.log(angle_to_rotate);
    		console.log("rotating:"+game_id);
    		img1.show();

    		img1.animate({transform: "r"+angle_to_rotate+",160,160,t50,0"}, 8000, "<>", function(){
    			//img.stop();	
    			img1.animate({transform: "r"+(angle_to_rotate+720)+",160,160,t50,0"}, 16000, "linear", function(){
	    			img1.hide();
	    		});
    		});

    		is_ball_rotating = 1;	
    	}
    });

    wheel_animation_stopping = Raphael.animation({transform: "r" + 1440}, 8000, "linear",function(){
    	img.animate({transform: "r0"},1);
    });

    // ball_animation_after = Raphael.animation({transform: "r360,200"}, 2000, "linear",function(){

    // });


    img.stop().animate(wheel_animation.repeat(Infinity));


	$(".two_select").mouseover(function(){
		$("#num_" + $(this).attr("nh1")).addClass("num_hover");
		$("#num_" + $(this).attr("nh2")).addClass("num_hover");
	});

	$(".two_select").mouseout(function(){
		$("#num_" + $(this).attr("nh1")).removeClass("num_hover");
		$("#num_" + $(this).attr("nh2")).removeClass("num_hover");
	});

	$(".four_select").mouseover(function(){
		$("#num_" + $(this).attr("nh1")).addClass("num_hover");
		$("#num_" + $(this).attr("nh2")).addClass("num_hover");
		$("#num_" + $(this).attr("nh3")).addClass("num_hover");
		$("#num_" + $(this).attr("nh4")).addClass("num_hover");
	});

	$(".four_select").mouseout(function(){
		$("#num_" + $(this).attr("nh1")).removeClass("num_hover");
		$("#num_" + $(this).attr("nh2")).removeClass("num_hover");
		$("#num_" + $(this).attr("nh3")).removeClass("num_hover");
		$("#num_" + $(this).attr("nh4")).removeClass("num_hover");
	});

	$(".num").click(function(){
		if(bet_place == 1){
			var num_val = $(this).attr('value');
			var y = $(this).position().top + 12;
			var x = $(this).position().left + 6;
			if($(".coin_"+num_val).length == 0){
				$(".canvas").append('<div class="coin coin_'+ num_val+'" style="top:'+ y +'px; left:'+ x +'px ">10</div>');
			} else {
				$(".coin_"+num_val).html(parseInt($(".coin_"+num_val).html())+bet_value);
			}
			if(bets[num_val]) bets[num_val] +=  bet_value;
			else bets[num_val] = bet_value;

			last_bet[last_bet_count] = [];
			last_bet[last_bet_count]["div_value"] = num_val;
			last_bet[last_bet_count]["effected"] = num_val;
			last_bet[last_bet_count]["money"] = bet_value;
			last_bet_count++;

			console.log(bets);
		}
	});

	$(".two_select").click(function(){
		if(bet_place == 1){
			var num_val = $(this).attr('value');
			var nh1 = $(this).attr('nh1');
			var nh2 = $(this).attr('nh2');
			var y = $(this).position().top + 12;
			var x = $(this).position().left - 6;
			if($(".coin_"+num_val).length == 0){
				$(".canvas").append('<div class="coin coin_'+ num_val+'" style="top:'+ y +'px; left:'+ x +'px ">10</div>');
			} else {
				$(".coin_"+num_val).html(parseInt($(".coin_"+num_val).html())+bet_value);
			}
			if(bets[nh1]) bets[nh1] +=  bet_value/2;
			else bets[nh1] = bet_value/2;

			if(bets[nh2]) bets[nh2] +=  bet_value/2;
			else bets[nh2] = bet_value/2;

			last_bet[last_bet_count] = [];
			last_bet[last_bet_count]["div_value"] = num_val;
			last_bet[last_bet_count]["effected"] = nh1+','+nh2;
			last_bet[last_bet_count]["money"] = bet_value;
			last_bet_count++;

			console.log(bets);
			console.log(last_bet);
		}
	});

	$(".four_select").click(function(){
		if(bet_place == 1){

			var num_val = $(this).attr('value');
			var y = $(this).position().top - 8;
			var x = $(this).position().left - 6;
			var nh1 = $(this).attr('nh1');
			var nh2 = $(this).attr('nh2');
			var nh3 = $(this).attr('nh3');
			var nh4 = $(this).attr('nh4');
			if($(".coin_"+num_val).length == 0){
				$(".canvas").append('<div class="coin coin_'+ num_val+'" style="top:'+ y +'px; left:'+ x +'px ">'+bet_value+'</div>');
			} else {
				$(".coin_"+num_val).html(parseInt($(".coin_"+num_val).html())+bet_value);
			}
			if(bets[nh1]) bets[nh1] +=  bet_value/4;
			else bets[nh1] = bet_value/4;

			if(bets[nh2]) bets[nh2] +=  bet_value/4;
			else bets[nh2] = bet_value/4;

			if(bets[nh3]) bets[nh3] +=  bet_value/4;
			else bets[nh3] = bet_value/4;

			if(bets[nh4]) bets[nh4] +=  bet_value/4;
			else bets[nh4] = bet_value/4;
			last_bet_div_value = num_val;

			last_bet[last_bet_count] = [];
			last_bet[last_bet_count]["div_value"] = num_val;
			last_bet[last_bet_count]["effected"] = nh1+','+nh2+','+nh3+','+nh4;
			last_bet[last_bet_count]["money"] = bet_value;
			last_bet_count++;

			console.log(bets);
		}
	});
}

$(".clear_bets").click(function(e){
	bets = [];
	$(".coin").hide(500, function(){
		$(".coin").remove();
	})
	console.log(bets);
});

$(".clear_last_bet").click(function(e){
	if(last_bet_count > 0){
		last_bet_count-- ;
		if((parseInt($(".coin_"+last_bet[last_bet_count]["div_value"]).html()) - last_bet[last_bet_count]["money"]) > 0)
			$(".coin_"+last_bet[last_bet_count]["div_value"]).html(parseInt($(".coin_"+last_bet[last_bet_count]["div_value"]).html()) - last_bet[last_bet_count]["money"]);
		else $(".coin_"+last_bet[last_bet_count]["div_value"]).remove();
		effected_bets = last_bet[last_bet_count]["effected"].split(',');
		for (var i = effected_bets.length - 1; i >= 0; i--) {
			bets[effected_bets[i]] -= last_bet[last_bet_count]["money"]/effected_bets.length;
		};
		console.log(bets);
		last_bet.pop();
		console.log(last_bet);
	}
});