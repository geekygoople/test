POINT = { STRAIGHT_FLUSH: 900, FOUR_OF_KIND: 800, FULL_HOUSE:700, FLUSH_HAND: 600};

function PokerHand(cardStrArray){
	this.cards = [];
	this.point = 0;
	var value, suit;

	for(var i=0, len=cardStrArray.length; i<len; i++) {
		value = (cardStrArray[i].length == 3) ? cardStrArray[i].slice(0,2) : cardStrArray[i].slice(0,1) ;
		suit = (cardStrArray[i].length == 3) ? cardStrArray[i].slice(2,3) : cardStrArray[i].slice(1,2);
		this.cards.push(new Card(value, suit));
	}

	this.cards.sort();
}

PokerHand.prototype = {
	constructor: PokerHand,
	getPoint: function(){
		return this.point;
	},
	checkRank: function(){
		if(this.checkStraightFlush()){
			return;
		}
		if(this.checkFourOfKind()){
			return;
		}
		/*if(this.checkFullHouse()){
			return;
		}*/
		if(this.checkFlushHand()){
			return;
		}
		return this.getHightCard();

	},
	checkStraightFlush: function(){
		var cards = this.cards;
		var baseCard = cards[0];
		var count = 1;
		for(var idx in cards){
			if(!cards[idx].isSameSuit(baseCard)){
				return false;
			}
			if(cards[idx].getIntValue() !== (baseCard.getIntValue() + count)){
				return false;
			}
			count++;
		}
		this.point = POINT.STRAIGHT_FLUSH;
		return true;
	},

	checkFourOfKind: function(){
		var cards = this.cards;
		var len = cards.length;
		var count = 0;

		for(var i=0; i<len; i++){
			count = 0;
			for(var j=i+1; j<len; j++){
				if(cards[i].getValue() == cards[j].getValue()){
					count++;
					if(count == 4) {
						this.point = POINT.FOUR_OF_KIND;
						return true;
					}
				}
				else{
					count = 0;
					break;
				}
			}
		}
		return false;
	},

	checkFlushHand: function(){
		var cards = this.cards;		
		var baseCard = cards[0];
		for(var idx in cards){
			if(!cards[idx].isSameSuit(baseCard)){
				return false;
			}
		}
		this.point = POINT.FLUSH_HAND;
		return true;
	},

	getHighCard: function(){
		var cards = this.cards;
		var maxCard;
		for(var i=0, len=cards.length; i<len; i++) {
			if(cards[i].getIntValue() > maxCard.getIntValue()){
				max = cards[i];
			}
			else if(cards[i].getIntValue() == maxCard.getIntValue()){
				if(cards[i].compareSuit(maxCard) == 1){
					max = cards[i];
				}
			}
		}
		return maxCard.getIntValue();
	}
}

function Card(value, suit) {
	this.value = value;
	this.suit = suit;
}

Card.prototype = {
	constructor: Card,

	getValue: function(){
		return this.value;
	},

	getIntValue: function(){
		var val = this.value;

		// 2-10
		if(!isNaN(val)){
			return val;
		}

		// J Q K A
		switch(val){
			case "J":
			return 11;
			case "Q":
			return 12;
			case "K":
			return 13;
			case "A":
			return 14;
		}
	},

	getSuit: function(){
		return this.suit;
	},

	compareTo: function(anotherCard) {
		var dif = this.value > anotherCard.getIntValue();

		if(dif === 0){
			return this.compareSuit(anotherCard);
		}
		if(dif > 0){
			return 1; 
		}

		return -1;
	},

	compareSuit: function(anotherCard){
		if(this.suit === anotherCard.getSuit()){
			return 0;
		}
		if(this.suit > anotherCard.getSuit()) {
			return 1;
		}

		return -1;
	},

	isSameSuit: function(anotherCard){
		return (this.compareSuit(anotherCard) == 0);
	}
};