class Level {
	constructor(id, duree, obs, ecart, inter, img) {
		this.id = id;
		this.duree = duree;
		this.obstacles = obs;	// avec proba ?
		this.ecart = ecart;
		this.interval = inter;

		// écart X entre obs, vitesse Y obs, tailles
		
		this.fond = img;
	}

	drawFond(ctx) {
		ctx.save();
		ctx.drawImage(this.fond, 0, 0);
		//ctx.drawImage(this.fond, 0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.restore();
	}
}