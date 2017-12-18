class Bullet{
    constructor(x,y,tb){
        this.posX = x;
        this.posY =y;
        this.taillebullet = tb;
    }

    draw(ctx){
        ctx.fillStyle = "white";
        ctx.fillRect(this.posX,this.posY,this.taillebullet,this.taillebullet);
    }


}