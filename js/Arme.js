class Arme{
    constructor(x,y,d,m,c,bs,tb){
        this.posX = x;
        this.posY = y;

        this.munition = m;

        this.array_chargeur = [];
        this.index = 0;


        this.degat = d ;
        this.bulletspeed= bs;
        this.taillebullet = tb;

    }


    drawStat(ctx){
        ctx.save();
        ctx.font = "15px Arial";
        ctx.fillStyle = "white";
        ctx.translate(20,10);
        ctx.fillText("Munition", 300, 450);
        ctx.fillText(this.munition, 300, 470);
        ctx.restore();
    }





}
