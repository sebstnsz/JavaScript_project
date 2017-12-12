class AvatarSelector extends ElementMenu{
    constructor(x,y,long,larg,s,c,img){
        super(x,y,1,c);
        this.long = long;
        this.larg = larg;
        this.img = img;
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.scale(this.scale,this.scale);
        ctx.shadowColor = "white";
        ctx.drawImage(this.img,this.x,this.y,this.long,this.larg);
        ctx.restore();
    }

    setSize(size){
        this.larg = size;
        this.long = size;
    }
    setPosY(y){
        this.y = y;
    }
    setColor(color){
        this.color = color;
    }
}

