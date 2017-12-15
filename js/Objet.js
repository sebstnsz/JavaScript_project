class Objet{

    constructor(img,x,y,life,speed,long,larg,s){
        this.image = img;
        this.x = x;
        this.y = y;
        this.life = life; // 0 to 10
        this.speed = speed; // 0 to 10
        this.long = long;
        this.larg = larg;

        this.scale = s;
    }

    setPosition(x,y){
        this.x = x;
        this.y = y;
    }

    moveX(status){
        if(status === 0){
            this.x = this.x + this.speed;
        }else{
            this.x = this.x - this.speed;
        }

    }

    moveY(status){
        if(status === 0){
            this.y = this.y - this.speed;
        }else{
            this.y = this.y + this.speed;
        }
    }

    draw(ctx){
        ctx.save();
       // ctx.translate(this.x,this.y);
        ctx.scale(this.scale,this.scale);
        ctx.drawImage(this.image,this.x,this.y,this.larg,this.long);
        ctx.restore();

    }
}



