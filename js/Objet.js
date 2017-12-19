class Objet{

    constructor(img,x,y,life,vx,vy,long,larg){
        this.image = img;
        this.x = x;
        this.y = y;
        this.life = life; // 0 to 10
        this.vitesseX = vx;
        this.vitesseY = vy;
        this.long = long;
        this.larg = larg;
    }
    
    setPosition(x,y){
        this.x = x;
        this.y = y;
    }

    draw(ctx){
        ctx.save();
        ctx.drawImage(this.image,this.x,this.y,this.larg,this.long);
        ctx.restore();

    }
}



