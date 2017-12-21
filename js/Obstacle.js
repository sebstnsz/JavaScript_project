class Obstacle extends Objet {
	constructor(x,vx,vy,w,h,vie,img) {
		super(img,x,-h,vie,vx,vy,w,h);
	}

	moveX() { this.x += this.vitesseX; }
	moveY() { this.y += this.vitesseY; }

	animer() {
		this.moveX();
		this.moveY();
	}

	out(ctx) {
		var w = ctx.canvas.width;
		var h = ctx.canvas.height;
		return (this.y >= h) || (this.x + this.largeur <= 0) || (this.y >= w); // bas|gauche|droite
	}
}

class ObstacleEasy extends Obstacle {
	constructor(x) {
		let vx=0;
		let vy=1;
		let w=30;
		let h=30;
		let vie=10;
		let img = document.querySelector("#meteor");
		super(x,vx,vy,w,h,vie,img);
	}
}

class ObstacleMedium extends Obstacle {
	constructor(x) {
		let vx=0;
		let vy=2;
		let w=50;
		let h=50;
		let vie=20;
		let img = document.querySelector("#asteroid");
		super(x,vx,vy,w,h,vie,img);
	}
}

class ObstacleHard extends Obstacle {
	constructor(x) {
		let vx=0;	// random vx ?
		let vy=3;
		let w=70;
		let h=70;
		let vie=50;
		let img = document.querySelector("#milky");
		super(x,vx,vy,w,h,vie,img);
	}
}