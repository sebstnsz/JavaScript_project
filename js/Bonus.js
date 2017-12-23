class Bonus extends Objet {
	constructor(id,x,img) {
		super(img,x,-50,1,0,1.5,25,25);
		this.id =id;
	}

	animer() { this.y += this.vitesseY; }

	out(ctx) { return this.y >= ctx.canvas.height; }
}

class BonusVie extends Bonus {
	constructor(x) {
		let img = document.querySelector("#bonusvie");
		super(1,x,img);
	}
}

class BonusArme extends Bonus {
	constructor(x) {
		let img = document.querySelector("#bonusarme");
		super(2,x,img);
		this.attachedGun = new Arme(10,100,10,7.5);
	}
}