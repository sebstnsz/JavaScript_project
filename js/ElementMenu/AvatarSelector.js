class AvatarSelector extends ElementMenu{
    constructor(x,y,long,larg,s,c){
        super(x,y,s,c);
        this.long = long;
        this.larg = larg;
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.scale(this.scale,this.scale);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.long,this.larg);
        ctx.restore();
    }

    setColor(color){
        this.color = color;
    }
}

