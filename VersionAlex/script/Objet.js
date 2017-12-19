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
		ctx.translate(this.posX, this.posY);
		ctx.drawImage(this.image,0,0,this.largeur,this.hauteur);
		ctx.restore();
	}
}