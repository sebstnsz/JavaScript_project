class Objet{

    constructor(img,x,y,life,speed,long,larg){
        this.image = img;
        this.x = x;
        this.y = y;
        this.life = life; // 0 to 10
        this.speed = speed; // 0 to 10
        this.long = long;
        this.larg = larg;
    }

    move(){

    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.drawImage(this.image,0,0,this.larg,this.long);
        ctx.restore();

    }
}



