class Objet{

    constructor(img,x,y,life,vx,vy,hauteur,larg){
        this.image = img;
        this.x = x;
        this.y = y;
        this.life = life; // 0 to 10
        this.vitesseX = vx;
        this.vitesseY = vy;
        this.hauteur = hauteur;
        this.largeur = larg;
    }

    setPosition(x,y){
        this.x = x;
        this.y = y;
    }

    draw(ctx){
        ctx.save();
        ctx.drawImage(this.image,this.x,this.y,this.largeur,this.hauteur);
        ctx.restore();

    }
}



