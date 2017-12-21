class Bonus extends Objet {
	constructor(x,vy,img) {
		super(img,x,-h,1,0,vy,50,50);
	}

	animer() {
		this.x += this.vitesseX;
		this.y += this.vitesseY;
	}

	out(ctx) {
		return this.y >= ctx.canvas.height;
	}
}

class BonusVie extends Bonus {
	constructor(x,vy) {
		let img = document.querySelector("#bonusvie");
		super(x,vy,img);
	}
}

class BonusMunition extends Bonus {
	constructor(x,vy) {
		let img = document.querySelector("#bonusmunition");
		super(x,vy,img);
	}
}