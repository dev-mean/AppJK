function Interface(){
	var top = 0;
	var right = 0;
	var j =0;
	var width_val = $(".mobile-table").width()/5;
	var height_val = $(".mobile-table").height()/15;
	
	// All numbers
	var val = 3;
	for(var i = 1; i<=36; i++){
		top = 2*height_val+j*height_val;
		value = val + 3*j;
		$("#bet_table").append('<div id="num_'+value+'" class="num num_normal" value="'+value+'" style="top: '+top+'px;right: '+right+'px; width:'+width_val+'px; height:'+height_val+'px "></div>');
		j++;
		if(i%12 == 0){
			right = right + width_val;
			j=0;
			if(i < 24){val = 2;}
			else val = 1;
		}
	}

	// 
	top = 14*height_val;
	right = 0;
	var two_to_one = ["37","38","39"];
	for (var i = two_to_one.length - 1; i >= 0; i--) {
		$("#bet_table").append('<div class="two_to_one" value="'+two_to_one[i]+'" style="top: '+top+'px; right: '+right+'px; width:'+width_val+'px; height:'+height_val+'px"></div>');
		right = right + width_val;
	};

	left = 58;
	top = 146;
	var three_half = ["42","41","40"];
	for (var i = three_half.length - 1; i >= 0; i--) {
		$("#bet_table").append('<div class="three_half" value="'+three_half[i]+'" style="top: '+top+'px; left: '+left+'px;"></div>');
		left = left + 147;
	};

	left = 58;
	top = 210;
	var one_half = ["44","43"];
	for (var i = one_half.length - 1; i >= 0; i--) {
		$("#bet_table").append('<div class="one_half" value="'+one_half[i]+'" style="top: '+top+'px; left: '+left+'px;"></div>');
		left = left + 370;
	};


	left = 58 + 74;
	top = 210;
	var odd_even = ["45","46"];
	for (var i = odd_even.length - 1; i >= 0; i--) {
		$("#bet_table").append('<div class="odd_even" value="'+odd_even[i]+'" style="top: '+top+'px; left: '+left+'px;"></div>');
		left = left + 218;
	};

	left = 58 + 148;
	top = 210;
	var red_black = ["48","47"];
	for (var i = red_black.length - 1; i >= 0; i--) {
		$("#bet_table").append('<div class="red_black" value="'+red_black[i]+'" style="top: '+top+'px; left: '+left+'px;"></div>');
		left = left + 72;
	};

	top = 0;
	j =0;
	val = 3;
	val_others = 100;
	for(var i = 1; i<=33; i++){

		left = 58 + 32+36.5*j;
		value1 = val + 3*j;
		value2 = val + 3*(j+1);
		$("#bet_table").append('<div class="two_select" value="'+val_others+'" nh1="'+value1+'" nh2="'+value2+'" style="top: '+top+'px;left: '+left+'px;"></div>');
		j++;

		if(i%11 == 0){
			top = top + 48;
			j=0;
			if(i < 22){val = 2;}
			else val = 1;
		}
		val_others++;
	}

	val_others = 200;
	top = 44;
	j =0;
	val = 3;
	for(i = 1; i<=22; i++){
		left = 58 + 32 + 36.75*j;
		value1 = val + 3*j;
		value2 = val + 3*(j+1);
		value3 = value1 - 1;
		value4 = value2 - 1;
		$("#bet_table").append('<div class="four_select" value="'+val_others+'" nh1="'+value1+'" nh2="'+value2+'" nh3="'+value3+'" nh4="'+value4+'" style="top: '+top+'px;left: '+left+'px;"></div>');
		j++;

		if(i%11 == 0){
			top = top + 49;
			j=0;
			val = 2;
		}
		val_others++;

	}

	$(".num_-1").mouseover(function(){
		$(this).find('polygon').attr('fill-opacity',0.2);
	});
	$(".num_-1").mouseout(function(){
		$(this).find('polygon').attr('fill-opacity',0);
	});

	$(".num_0").mouseover(function(){
		$(this).find('polygon').attr('fill-opacity',0.2);
	});
	$(".num_0").mouseout(function(){
		$(this).find('polygon').attr('fill-opacity',0);
	});

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

	// 1-36 click
	$(".num").mousedown(function(){
		if(bet_place == 1 && (credits_bal - bet_value) >= 0){
			createjs.Sound.play("fiche_select");

			var num_val = $(this).attr('value');

			if(bets[num_val]) bets[num_val] +=  bet_value;
			else bets[num_val] = bet_value;
			if(bets_others[num_val]) bets_others[num_val] +=  bet_value;
			else bets_others[num_val] = bet_value;

			update_coins_final(num_val);
	
			last_bet[last_bet_count] = {};
			last_bet[last_bet_count].div_value = num_val;
			last_bet[last_bet_count].effected = num_val;
			last_bet[last_bet_count].money = bet_value;
			last_bet_count++;
			console.log(bets);
			bet_amount = bet_amount + bet_value;
			update_bet_amount();
		}
	});
	// $(".num").dblclick(function(){
	// 	if(bet_place == 1 && (credits_bal - bet_value) >= 0){
			createjs.Sound.play("fiche_select");

	// 		var num_val = $(this).attr('value');

	// 		if(bets[num_val]) bets[num_val] +=  bet_value;
	// 		else bets[num_val] = bet_value;
	// 		if(bets_others[num_val]) bets_others[num_val] +=  bet_value;
	// 		else bets_others[num_val] = bet_value;

	// 		update_coins_final(num_val);
	
	// 		last_bet[last_bet_count] = {};
	// 		last_bet[last_bet_count].div_value = num_val;
	// 		last_bet[last_bet_count].effected = num_val;
	// 		last_bet[last_bet_count].money = bet_value;
	// 		last_bet_count++;
	// 		console.log(bets);
	// 		bet_amount = bet_amount + bet_value;
	// 		update_bet_amount();
	// 	}
	// });

	// 0 Click
	$(".num_0").click(function(){
		if(bet_place == 1 && (credits_bal - bet_value) >= 0){
			createjs.Sound.play("fiche_select");

		
			var num_val = $(this).attr('value');
			
			if(bets[num_val]) bets[num_val] +=  bet_value;
			else bets[num_val] = bet_value;
			if(bets_others[num_val]) bets_others[num_val] +=  bet_value;
			else bets_others[num_val] = bet_value;

			//update_coins(num_val,x,y+72,-5,0,x+16,y+80,bets_others[num_val]);
			update_coins_final(num_val);
	
			last_bet[last_bet_count] = {};
			last_bet[last_bet_count].div_value = num_val;
			last_bet[last_bet_count].effected = num_val;
			last_bet[last_bet_count].money = bet_value;
			last_bet_count++;


			bet_amount = bet_amount + bet_value;
			update_bet_amount();
		}
	});

	//00 Click
	$(".num_-1").click(function(){
		if(bet_place == 1 && (credits_bal - bet_value) >= 0){
			createjs.Sound.play("fiche_select");

		
			var num_val = $(this).attr('value');
			// var y = $(this).position().top + 18;
			// var x = $(this).position().left;

			if(bets[num_val]) bets[num_val] +=  bet_value;
			else bets[num_val] = bet_value;
			if(bets_others[num_val]) bets_others[num_val] +=  bet_value;
			else bets_others[num_val] = bet_value;

			//update_coins(num_val,x,y,-5,0,x+16,y+8,bets_others[num_val]);
			update_coins_final(num_val);
			
			last_bet[last_bet_count] = {};
			last_bet[last_bet_count].div_value = num_val;
			last_bet[last_bet_count].effected = num_val;
			last_bet[last_bet_count].money = bet_value;
			last_bet_count++;


			bet_amount = bet_amount + bet_value;
			update_bet_amount();
		}
	});

	// 2 to 1 clicks
	$(".two_to_one").click(function(){
		if(bet_place == 1 && (credits_bal - bet_value) >= 0){
			createjs.Sound.play("fiche_select");

			var num_val = $(this).attr('value');
			// var y = $(this).position().top + 8;
			// var x = $(this).position().left + 2;

			if(bets[num_val]) bets[num_val] +=  bet_value;
			else bets[num_val] = bet_value;
			if(bets_others[num_val]) bets_others[num_val] +=  bet_value;
			else bets_others[num_val] = bet_value;

			//update_coins(num_val,x,y,0,5,x,y+8,bets_others[num_val]);
			update_coins_final(num_val);
	
			last_bet[last_bet_count] = {};
			last_bet[last_bet_count].div_value = num_val;
			last_bet[last_bet_count].effected = num_val;
			last_bet[last_bet_count].money = bet_value;
			last_bet_count++;


			bet_amount = bet_amount + bet_value;
			update_bet_amount();
		}
	});

	// 3 halfs click
	$(".three_half").click(function(){
		if(bet_place == 1 && (credits_bal - bet_value) >= 0){
			createjs.Sound.play("fiche_select");

			var num_val = $(this).attr('value');
			// var y = $(this).position().top + 12;
			// var x = $(this).position().left + 12;

			if(bets[num_val]) bets[num_val] +=  bet_value;
			else bets[num_val] = bet_value;
			if(bets_others[num_val]) bets_others[num_val] +=  bet_value;
			else bets_others[num_val] = bet_value;

			//update_coins(num_val,x,y,-5,0,x+48,y+8,bets_others[num_val]);
			update_coins_final(num_val);
	
			last_bet[last_bet_count] = {};
			last_bet[last_bet_count].div_value = num_val;
			last_bet[last_bet_count].effected = num_val;
			last_bet[last_bet_count].money = bet_value;
			last_bet_count++;


			bet_amount = bet_amount + bet_value;
			update_bet_amount();
		}
	});

	// 1 half click
	$(".one_half").click(function(){
		if(bet_place == 1 && (credits_bal - bet_value) >= 0){
			createjs.Sound.play("fiche_select");

			var num_val = $(this).attr('value');
			// var y = $(this).position().top + 12;
			// var x = $(this).position().left + 12;

			if(bets[num_val]) bets[num_val] +=  bet_value;
			else bets[num_val] = bet_value;
			if(bets_others[num_val]) bets_others[num_val] +=  bet_value;
			else bets_others[num_val] = bet_value;

			//update_coins(num_val,x,y,-5,0,x+8,y+8,bets_others[num_val]);
			update_coins_final(num_val);
			
			last_bet[last_bet_count] = {};
			last_bet[last_bet_count].div_value = num_val;
			last_bet[last_bet_count].effected = num_val;
			last_bet[last_bet_count].money = bet_value;
			last_bet_count++;


			bet_amount = bet_amount + bet_value;
			update_bet_amount();
		}
	});

	// Odd even click
	$(".odd_even").click(function(){
		if(bet_place == 1 && (credits_bal - bet_value) >= 0){
			createjs.Sound.play("fiche_select");

			var num_val = $(this).attr('value');
			// var y = $(this).position().top + 12;
			// var x = $(this).position().left + 12;

			if(bets[num_val]) bets[num_val] +=  bet_value;
			else bets[num_val] = bet_value;
			if(bets_others[num_val]) bets_others[num_val] +=  bet_value;
			else bets_others[num_val] = bet_value;

			//update_coins(num_val,x,y,-5,0,x+8,y+8,bets_others[num_val]);
			update_coins_final(num_val);

			last_bet[last_bet_count] = {};
			last_bet[last_bet_count].div_value = num_val;
			last_bet[last_bet_count].effected = num_val;
			last_bet[last_bet_count].money = bet_value;
			last_bet_count++;


			bet_amount = bet_amount + bet_value;
			update_bet_amount();
		}
	});

	// red black click
	$(".red_black").click(function(){
		if(bet_place == 1 && (credits_bal - bet_value) >= 0){
			createjs.Sound.play("fiche_select");

			var num_val = $(this).attr('value');
			// var y = $(this).position().top + 12;
			// var x = $(this).position().left + 12;

			if(bets[num_val]) bets[num_val] +=  bet_value;
			else bets[num_val] = bet_value;
			if(bets_others[num_val]) bets_others[num_val] +=  bet_value;
			else bets_others[num_val] = bet_value;

			//update_coins(num_val,x,y,-5,0,x+8,y+8,bets_others[num_val]);
			update_coins_final(num_val);
	
			last_bet[last_bet_count] = {};
			last_bet[last_bet_count].div_value = num_val;
			last_bet[last_bet_count].effected = num_val;
			last_bet[last_bet_count].money = bet_value;
			last_bet_count++;


			bet_amount = bet_amount + bet_value;
			update_bet_amount();
		}
	});

	// if clicked between 2 numbers
	$(".two_select").click(function(){
		if(bet_place == 1 && (credits_bal - bet_value) >= 0){
			createjs.Sound.play("fiche_select");

			var num_val = $(this).attr('value');
			var nh1 = $(this).attr('nh1');
			var nh2 = $(this).attr('nh2');

			// var y = $(this).position().top + 6;
			// var x = $(this).position().left - 12;
			

			if(bets[nh1]) bets[nh1] +=  bet_value/2;
			else bets[nh1] = bet_value/2;

			if(bets[nh2]) bets[nh2] +=  bet_value/2;
			else bets[nh2] = bet_value/2;

			if(bets_others[num_val]) bets_others[num_val] +=  bet_value;
			else bets_others[num_val] = bet_value;

			//update_coins(num_val,x,y,0,0,x,y,bets_others[num_val]);
			update_coins_final(num_val);
			

			last_bet[last_bet_count] = {};
			last_bet[last_bet_count].div_value = num_val;
			last_bet[last_bet_count].effected = nh1+','+nh2;
			last_bet[last_bet_count].money = bet_value;
			last_bet_count++;
			bet_amount = bet_amount + bet_value;
			update_bet_amount();
		}
	});

	// if clicked between 4 numbers
	$(".four_select").click(function(){
		if(bet_place == 1 && (credits_bal - bet_value) >= 0){
			createjs.Sound.play("fiche_select");


			var num_val = $(this).attr('value');
			var y = $(this).position().top - 16;
			var x = $(this).position().left - 10;
			var nh1 = $(this).attr('nh1');
			var nh2 = $(this).attr('nh2');
			var nh3 = $(this).attr('nh3');
			var nh4 = $(this).attr('nh4');
			
			if(bets[nh1]) bets[nh1] +=  bet_value/4;
			else bets[nh1] = bet_value/4;

			if(bets[nh2]) bets[nh2] +=  bet_value/4;
			else bets[nh2] = bet_value/4;

			if(bets[nh3]) bets[nh3] +=  bet_value/4;
			else bets[nh3] = bet_value/4;

			if(bets[nh4]) bets[nh4] +=  bet_value/4;
			else bets[nh4] = bet_value/4;
			last_bet_div_value = num_val;
			
			if(bets_others[num_val]) bets_others[num_val] +=  bet_value;
			else bets_others[num_val] = bet_value;

			//update_coins(num_val,x,y,0,0,x,y,bets_others[num_val]);
			update_coins_final(num_val);

			last_bet[last_bet_count] = {};
			last_bet[last_bet_count].div_value = num_val;
			last_bet[last_bet_count].effected = nh1+','+nh2+','+nh3+','+nh4;
			last_bet[last_bet_count].money = bet_value;
			last_bet_count++;
			bet_amount = bet_amount + bet_value;
			update_bet_amount();

		}
	});

}