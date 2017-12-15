class Objet {
	constructor(x,y,vx,vy,w,h,vie,image) {
		this.posX = x;
		this.posY = y;
		this.vitesseX = vx;
		this.vitesseY = vy;
		this.largeur = w;
		this.hauteur = h;
		this.vie = vie;
		this.image = image;
	}

	dessiner(ctx) {
		ctx.save();
		ctx.translate(this.posX-this.largeur/2, this.posY-this.hauteur/2);
		ctx.fillStyle = "white";
		ctx.fillRect(0,0,this.largeur,this.hauteur);
		//ctx.drawImage(this.image,0,0,this.largeur,this.hauteur);
		//ctx.translate(-this.posX + this.largeur/2, -this.posY + this.hauteur/2);
		ctx.restore();
	}

	moveX() { this.posX += this.vitesseX; }
	moveY() { this.posY += this.vitesseY; }

	animer() {
		this.moveX();
		this.moveY();
	}
}