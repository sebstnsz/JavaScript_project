class Obstacle extends Objet {
	constructor(x,vx,vy,w,h,vie,img) {
		super(x,-h,vx,vy,w,h,vie,img);
		// x : défini dans création
		// y : -h par défaut
		// vx,vy,w,h,vie, image : défini dans fils
	}

	out(ctx) {
		var w = ctx.canvas.width;
		var h = ctx.canvas.height;
		return (this.posY >= h) || (this.posX+this.largeur <= 0) || (this.posX >= w);
	}
}

// dans classe suivantes, dessiner() est temporaire, il est défini dans la classe Objet

class ObstacleEasy extends Obstacle {
	constructor(x) {
		let vx=0;
		let vy=1;
		let w=10;
		let h=10;
		let vie=0;
		let img=0;
		super(x,vx,vy,w,h,vie,img);
		//super(x,0,1,10,10,0,0);
	}
	dessiner(ctx) {
		ctx.save();
		ctx.translate(this.posX, this.posY);
		ctx.fillStyle = "green";
		ctx.fillRect(0,0,this.largeur,this.hauteur);
		//ctx.translate(-this.posX, -this.posY);
		ctx.restore();
	}
}

class ObstacleMedium extends Obstacle {
	constructor(x) {
		let vx=0;
		let vy=2;
		let w=20;
		let h=20;
		let vie=10;
		let img=0;
		super(x,vx,vy,w,h,vie,img);
		//super(x,0,2,20,20,10,0);
	}
	dessiner(ctx) {
		ctx.save();
		ctx.translate(this.posX, this.posY);
		ctx.fillStyle = "orange";
		ctx.fillRect(0,0,this.largeur,this.hauteur);
		//ctx.translate(-this.posX, -this.posY);
		ctx.restore();
	}
}

class ObstacleHard extends Obstacle {
	constructor(x) {
		let vx=0;	// random vx ?
		let vy=3;
		let w=20;
		let h=20;
		let vie=20;
		let img=0;
		super(x,vx,vy,w,h,vie,img);
		//super(x,0,3,20,20,20,0);
	}
	dessiner(ctx) {
		ctx.save();
		ctx.translate(this.posX, this.posY);
		ctx.fillStyle = "red";
		ctx.fillRect(0,0,this.largeur,this.hauteur);
		//ctx.translate(-this.posX, -this.posY);
		ctx.restore();
	}
}