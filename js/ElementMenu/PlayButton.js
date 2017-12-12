class PlayButton extends ElementMenu{
    constructor(x,y,s,c,txt,fs,blur){
        super(x,y,s,c);
        this.width = 0;
        this.height = 0; //430
        this.fontsize = fs;
        this.txt = txt;
        this.blur = blur;
        this.posx = 0;

    }
    getPosX(){
        return this.posx;
    }

    getY(){
        return this.y;
    }
    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }
    setBlur(blur){
        this.blur = blur;
    }
    draw(ctx){
        ctx.save();

        ctx.font = this.fontsize + "px True Lies";
        ctx.strokeStyle = "red";
        ctx.translate(this.x,this.y);
        this.width = ctx.measureText(this.txt).width;
        this.height = this.fontsize;
        ctx.strokeText(this.txt,ctx.canvas.width/2 - ctx.measureText(this.txt).width/2,0);

        ctx.shadowColor = "red";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = this.blur;
        ctx.fillStyle = this.color;
        ctx.fillText(this.txt,ctx.canvas.width/2 - ctx.measureText(this.txt).width/2,0);
        this.posx =ctx.canvas.width/2 - ctx.measureText(this.txt).width/2;
        ctx.restore();
    }
}