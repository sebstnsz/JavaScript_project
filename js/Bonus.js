class Bonus extends Objet {
	constructor(x,img) {
		super(img,x,-50,1,0,2,50,50);
	}

	animer() { this.y += this.vitesseY; }

	out(ctx) { return this.y >= ctx.canvas.height; }
}

class BonusVie extends Bonus {
	constructor(x) {
		let img = document.querySelector("#bonusvie");
		super(x,img);
	}
}

class BonusArme extends Bonus {
	constructor(x) {
		let img = document.querySelector("#bonusarme");
		super(x,img);
	}
}