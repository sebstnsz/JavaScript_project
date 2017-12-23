class Arme{
    constructor(d,m,bs,tb){
        this.posX = 0;
        this.posY = 0;

        this.munition = m;

        this.array_chargeur = [];
        this.index = 0;


        this.degat = d ;
        this.bulletspeed= bs;
        this.taillebullet = tb;

    }

    setPosition(x,y){
        this.posX = x;
        this.posY = y;
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
