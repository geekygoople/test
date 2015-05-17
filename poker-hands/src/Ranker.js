function Ranker(){
	
}

Ranker.prototype = {
	constructor: Ranker,
	rank: function(black, white) {
		var p1 = black.getPoint();
		var p2 = white.getPoint();

		if(p1 == p2){
			return "Tie";
		}
		if(p1 > p2){
			return "Black wins";
		}
		else{
			return "White wins";
		}
		return "";
	}
};