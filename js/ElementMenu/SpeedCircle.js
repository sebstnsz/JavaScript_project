class SpeedCircle extends ElementMenu{
    constructor(x,y,s,c){
        super(x,y,s,c);
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.scale(this.scale,this.scale);
        ctx.beginPath();
        ctx.shadowColor = this.color;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(75,250,50,0,2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}
