module.exports = {

getTotalBetAmount: function(betStr){
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
},

betOutput: function(betString, magicNum){

    // these are outputs
    var totalBet = 0;
    var finalAmmount = 0;

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

    return {
    	totalBet: totalBet,
    	finalAmmount: finalAmmount,
    	profit: finalAmmount - totalBet
    };  
}

};

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
		if( betCode == 45 && (magicNum % 2 == 1)){ //odd
			multiplier = 2;
		}
		if( betCode == 46 && (magicNum % 2 == 0)){ //even
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